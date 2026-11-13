import * as fs from 'fs';
import * as path from 'path';
import { LoggerHelper } from './LoggerHelper';

export class AccountStorageHelper {
    private static storageDir = path.resolve(process.cwd(), 'Documents', 'accountStorage');
    private static filePath = path.join(AccountStorageHelper.storageDir, 'registered_accounts.txt');

    /**
     * Oluşturulan hesabı kullanıcı tipiyle birlikte dosyaya ekler.
     * @param role Kullanıcı tipi (Student, Instructor, Organizator vb.)
     * @param name Kullanıcı ismi
     * @param email Kullanıcı mail adresi
     * @param password Kullanıcı şifresi
     */
    public static saveAccount(role: string, name: string, email: string, password: string): void {
        try {
            // Klasör yoksa oluştur
            if (!fs.existsSync(this.storageDir)) {
                fs.mkdirSync(this.storageDir, { recursive: true });
            }

            // Kaydedilecek içerik formatı (Role bilgisi eklendi)
            const timestamp = new Date().toISOString();
            const logEntry = `[${timestamp}] Role: ${role || 'N/A'} | Name: ${name || 'N/A'} | Email: ${email} | Password: ${password}\n`;

            // Dosyanın sonuna ekle (Append)
            fs.appendFileSync(this.filePath, logEntry, 'utf8');
            LoggerHelper.logInfo(`Hesap bilgileri başarıyla kaydedildi (${role}): ${email}`);

        } catch (error) {
            LoggerHelper.logError(`Hesap kaydedilirken hata oluştu: ${error}`);
        }
    }
}
