import { ToastTypeEnum } from '@/enums';
import React from 'react';
import styles from './index.module.scss';

export type ToastType = ToastTypeEnum;

const typeStyles: Record<ToastType, {icon: string; title: string}> = {
  success: {
    icon: '✔️',
    title: 'Success'
  },
  warning: {
    icon: '⚠️',
    title: 'Warning'
  },
  error: {
    icon: '❌',
    title: 'Error'
  }
};

type ToastProps = {
  type?: ToastType;
  title?: string;
  message: string;
  show: boolean;
  onClose?: () => void;
};

const Toast: React.FC<ToastProps> = ({
  type = 'success',
  title,
  message,
  show,
  onClose
}) => {
  const style = typeStyles[type as ToastType];

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${show ? styles.visible : styles.hidden}`}
    >
      <span className={styles.icon}>{style.icon}</span>
      <div className={styles.content}>
        <div className={styles.title}>{title || style.title}</div>
        <div className={styles.message}>{message}</div>
      </div>
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Kapat"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
