// components/ui/base-dialog.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/components/modal';

interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Modal isOpen={open} onClose={onClose} title={title}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="space-y-4"
          >
            {children}

            {footer && (
              <div className="flex justify-end gap-2 mt-4">
                {footer}
              </div>
            )}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default BaseDialog;
