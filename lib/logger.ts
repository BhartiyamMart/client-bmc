import toast from 'react-hot-toast';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  orderId?: string;
  storeId?: string;
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.log(`%c[DEBUG]`, 'color: #6B7280', message, context || '');
    }
  }

  info(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.log(`%c[INFO]`, 'color: #3B82F6', message, context || '');
    }
  }

  warn(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.warn(`%c[WARN]`, 'color: #F59E0B', message, context || '');
    }
  }

  error(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.error(`%c[ERROR]`, 'color: #EF4444', message, context || '');
    }
  }
}

export const logger = new Logger();
