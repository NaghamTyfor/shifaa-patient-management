import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../api/axios';

export const usePatients = (itemsPerPage = 4) => {
  const [patients, setPatients] = useState([]);
  const [totalPatientsCount, setTotalPatientsCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const debounceTimeout = useRef(null);
  const isFirstLoad = useRef(true);

  // جلب البيانات من الخادم (يُستخدم عند البحث، تغيير الصفحة، أو الإضافة)
  const fetchPatients = useCallback(async (search, page) => {
    setLoading(true);
    try {
      const response = await api.get('/patients', {
        params: {
          search: search || '',
          per_page: itemsPerPage,
          page: page || 1,
        },
      });

      const { data, meta } = response.data;
      const { current_page, last_page, total } = meta;

      setPatients(data);
      setTotalPatientsCount(total);
      setTotalPages(last_page);
      if (current_page !== page) {
        setCurrentPage(current_page);
      }
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
      setPatients([]);
      setTotalPatientsCount(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [itemsPerPage]);

  // دالة البحث مع debounce
  const debouncedSetSearch = useCallback((value) => {
    setSearchTerm(value);
    setCurrentPage(1);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchPatients(value, 1);
    }, 700);
  }, [fetchPatients]);

  // تأثير تغيير الصفحة
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    fetchPatients(searchTerm, currentPage);
  }, [currentPage]);

  // التحميل الأولي
  useEffect(() => {
    fetchPatients('', 1);
  }, []);

  // تنظيف المؤقت
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  // إضافة مريض (يبقى كما هو مع إعادة الجلب لضمان ظهور البيانات الجديدة)
  const addPatient = async (patientData) => {
    setLoading(true);
    try {
      await api.post('/patients', patientData);
      setSearchTerm('');
      setCurrentPage(1);
      await fetchPatients('', 1);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // حذف مريض واحد (تحديث محلي فوري)
  const deletePatient = async (id) => {
    setLoading(true);
    try {
      // 1. حذف من الخادم
      await api.delete(`/patients/${id}`);

      // 2. تحديث الحالة محلياً (بدون إعادة جلب)
      setPatients((prev) => prev.filter((p) => p.id !== id));
      setTotalPatientsCount((prev) => {
        const newTotal = prev - 1;
        // تحديث عدد الصفحات إذا لزم الأمر
        const newTotalPages = Math.ceil(newTotal / itemsPerPage);
        setTotalPages(newTotalPages || 1);
        // إذا كانت الصفحة الحالية أكبر من عدد الصفحات الجديد، انتقل للصفحة السابقة
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        return newTotal;
      });
      // إزالة المعرف من المحددات
      setSelectedIds((prev) => prev.filter((pid) => pid !== id));
    } catch (error) {
      console.error('فشل حذف المريض:', error);
      throw error; // يُرمى ليتم عرض رسالة الفشل في الواجهة
    } finally {
      setLoading(false);
    }
  };

  // حذف عدة مرضى (تحديث محلي فوري)
  const deleteMultiplePatients = async (ids) => {
    setLoading(true);
    try {
      // 1. حذف من الخادم
      await api.delete('/patients', { data: { ids } });

      // 2. تحديث الحالة محلياً (إزالة جميع المعرفات)
      const idsSet = new Set(ids);
      setPatients((prev) => prev.filter((p) => !idsSet.has(p.id)));
      setTotalPatientsCount((prev) => {
        const newTotal = prev - ids.length;
        const newTotalPages = Math.ceil(newTotal / itemsPerPage);
        setTotalPages(newTotalPages || 1);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        return newTotal;
      });
      // مسح المحددات
      setSelectedIds([]);

      return ids.length;
    } catch (error) {
      console.error('فشل الحذف الجماعي:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // دوال تحديد المرضى
  const toggleSelectPatient = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentPageIds = patients.map((p) => p.id);
    const allSelected = currentPageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedIds((prev) => {
        const newIds = currentPageIds.filter((id) => !prev.includes(id));
        return [...prev, ...newIds];
      });
    }
  };

  const clearSelected = () => setSelectedIds([]);

  const isAllSelected =
    patients.length > 0 && patients.every((p) => selectedIds.includes(p.id));

  // إرجاع القائمة الحالية (بعد التحديث المحلي)
  const getPaginatedPatients = () => patients;

  return {
    patients,
    filteredPatients: patients,
    selectedIds,
    currentPage,
    totalPages,
    totalPatientsCount,
    isAllSelected,
    searchTerm,
    loading,
    setSearchTerm: debouncedSetSearch,
    setCurrentPage,
    addPatient,
    deletePatient,
    deleteMultiplePatients,
    toggleSelectPatient,
    toggleSelectAll,
    clearSelected,
    getPaginatedPatients,
    fetchPatients,
  };
};