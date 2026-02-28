type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

class Logger {
    private formatMessage(level: LogLevel, context: string, message: string) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] [${context}] ${message}`;
    }

    info(context: string, message: string, data?: any) {
        console.log(this.formatMessage('INFO', context, message), data || '');
    }

    warn(context: string, message: string, data?: any) {
        console.warn(this.formatMessage('WARN', context, message), data || '');
    }

    error(context: string, message: string, error?: any) {
        console.error(this.formatMessage('ERROR', context, message), error || '');
    }

    debug(context: string, message: string, data?: any) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(this.formatMessage('DEBUG', context, message), data || '');
        }
    }
}

export const logger = new Logger();
