export class AppStorage {
    getItem(key: string): string {
        return sessionStorage.getItem(key);
    }

    getParsedItem(key: string) {
        return JSON.parse(this.getItem(key));
    }
}