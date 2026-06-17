import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { SimpleBackground } from '../ui/SimpleBackground';
import { usePatients } from '../../hooks/usePatients';
import { useToast } from '../../hooks/useToast';
import { Navbar } from '../layout/Navbar';
import { Sidebar } from '../layout/Sidebar';
import { Footer } from '../layout/Footer';
import { HeroSection } from '../home/HeroSection';
import { PatientsHeader } from './PatientsHeader';
import SelectionBar from './SelectionBar';
import { Pagination } from './Pagination';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { CustomToast } from '../common/CustomToast';
import { AddPatientModal } from '../common/AddPatientModal';
import PatientCard from './PatientCard';
import { AnimatedStethoscope } from '../ui/AnimatedStethoscope';

const heroImageSrc = '/shifa_hero_image_1780337209822-removebg-preview.png';

export const PatientsDashboard = () => {
  const {
    patients,
    filteredPatients,
    selectedIds,
    currentPage,
    totalPages,
    isAllSelected,
    searchTerm,
    setSearchTerm,
    loading,
    addPatient,
    deletePatient,
    deleteMultiplePatients,
    toggleSelectPatient,
    toggleSelectAll,
    clearSelected,
    setCurrentPage,
    getPaginatedPatients,
  } = usePatients(6);

  const { toast, showToast, hideToast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isBulkDeleteConfirmOpen, setIsBulkDeleteConfirmOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const paginatedPatients = getPaginatedPatients();

  const handleAddPatient = useCallback(async (patientData) => {
    try {
      await addPatient(patientData);
      showToast(' تم إضافة المريض بنجاح', 'success');
    } catch (error) {
      showToast(' فشل إضافة المريض. تأكد من صحة البيانات.', 'error');
    }
  }, [addPatient, showToast]);

  const confirmDelete = useCallback(async () => {
    if (deleteConfirmId) {
      setIsDeleting(true);
      try {
        await deletePatient(deleteConfirmId);
        setDeleteConfirmId(null);
        showToast(' تم حذف الملف الطبي بنجاح', 'success');
      } catch (error) {
        showToast(' فشل حذف المريض.', 'error');
      } finally {
        setIsDeleting(false);
      }
    }
  }, [deleteConfirmId, deletePatient, showToast]);

  const confirmBulkDelete = useCallback(async () => {
    if (selectedIds.length > 0) {
      setIsBulkDeleting(true);
      try {
        await deleteMultiplePatients(selectedIds);
        setIsBulkDeleteConfirmOpen(false);
        showToast(` تم حذف ${selectedIds.length} مريض بنجاح`, 'success');
      } catch (error) {
        showToast(' فشل الحذف الجماعي.', 'error');
      } finally {
        setIsBulkDeleting(false);
      }
    }
  }, [selectedIds, deleteMultiplePatients, showToast]);

  const handleSidebarToggle = useCallback(() => setIsSidebarOpen(prev => !prev), []);
  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);
  const handleBulkDeleteOpen = useCallback(() => setIsBulkDeleteConfirmOpen(true), []);
  const handleBulkDeleteClose = useCallback(() => setIsBulkDeleteConfirmOpen(false), []);

  return (
    <div className="min-h-screen bg-[#f4fbfc] text-right leading-relaxed flex flex-col font-sans relative antialiased scroll-smooth">
      <SimpleBackground />

      <Navbar onMenuClick={handleSidebarToggle} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="pt-20 flex-grow flex flex-col">
        <HeroSection heroImageSrc={heroImageSrc} />

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 pb-20 mt-10" dir="rtl">
          <PatientsHeader onAddClick={handleModalOpen} />

          <SelectionBar
            selectedIds={selectedIds}
            totalPatients={filteredPatients.length}
            onSelectAll={toggleSelectAll}
            onClearSelection={clearSelected}
            onBulkDelete={handleBulkDeleteOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            hasPatients={filteredPatients.length > 0}
            loading={loading}
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <AnimatedStethoscope size={56} />
              <p className="text-teal-800 text-sm font-bold tracking-wide animate-pulse">جاري تحديث السجلات الطبية...</p>
            </div>
          ) : filteredPatients.length > 0 ? (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {paginatedPatients.map((patient) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    style={{ contentVisibility: 'auto' }}
                  >
                    <PatientCard
                      patient={patient}
                      onDelete={(id) => setDeleteConfirmId(id)}
                      isSelected={selectedIds.includes(patient.id)}
                      onToggleSelect={toggleSelectPatient}
                      searchTerm={searchTerm}
                    />
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] border border-cyan-50 p-12 text-center max-w-xl mx-auto space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto border border-slate-100">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">
                  {searchTerm ? 'لا توجد نتائج مطابقة' : 'لا يوجد مرضى حالياً'}
                </h3>
                <p className="text-slate-500 text-sm">
                  {searchTerm
                    ? `لم يتم العثور على مريض باسم "${searchTerm}"، جرب كلمة بحث أخرى.`
                    : 'قم بإضافة مريض جديد للاطلاع على الملفات الطبية.'}
                </p>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAdd={handleAddPatient}
      />

      <ConfirmDialog
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={confirmDelete}
        title="تأكيد حذف الملف الطبي"
        message="هل أنت متأكد من حذف هذا المريض؟ هذا الإجراء لا يمكن التراجع عنه."
        confirmText="حذف المريض"
        cancelText="تراجع"
        isLoading={isDeleting}
      />

      <ConfirmDialog
        isOpen={isBulkDeleteConfirmOpen}
        onClose={handleBulkDeleteClose}
        onConfirm={confirmBulkDelete}
        title="تأكيد الحذف الجماعي"
        message={`هل أنت متأكد من حذف ${selectedIds.length} من السجلات الطبية المحددة؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف الجميع"
        cancelText="تراجع"
        isLoading={isBulkDeleting}
      />

      <CustomToast toast={toast} onClose={hideToast} />
    </div>
  );
};