// utils/RobotUtils.ts
import path from 'path';

export class RobotUtils {
    /**
     * Proje kök dizinini baz alarak relative path'i tam yola dönüştürür.
     * Örn: RobotUtils.getAssetPath('Documents/assets/math1.png')
     */
    static getAssetPath(relativePath: string): string {
        return path.resolve(process.cwd(), relativePath);
    }
}