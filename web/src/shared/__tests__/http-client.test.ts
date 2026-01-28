import { httpClient } from '../http-client';
import Cookies from 'js-cookie';
import { toastManager } from '@/app/providers/toast.context';

// Mock js-cookie
jest.mock('js-cookie', () => ({
    get: jest.fn(),
    remove: jest.fn(),
}));

// Mock toastManager
jest.mock('@/app/providers/toast.context', () => ({
    toastManager: {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
        warning: jest.fn(),
        show: jest.fn(),
    },
}));

describe('HttpClient', () => {
    let fetchSpy: jest.SpyInstance;

    beforeAll(() => {
        // Ensure fetch exists on global for spying
        if (!global.fetch) {
            global.fetch = jest.fn() as any;
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
        fetchSpy = jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
        if (fetchSpy) {
            fetchSpy.mockRestore();
        }
    });

    it('should include auth token in headers if available', async () => {
        (Cookies.get as jest.Mock).mockReturnValue('fake-token');
        fetchSpy.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ data: 'test' }),
        } as Response);

        await httpClient.get('/test');

        expect(fetchSpy).toHaveBeenCalledWith(
            expect.stringContaining('/test'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer fake-token',
                }),
            })
        );
    });

    it('should handle 401 response and clear tokens', async () => {
        fetchSpy.mockResolvedValue({
            ok: false,
            status: 401,
            json: async () => ({ message: 'Unauthorized' }),
        } as Response);

        await httpClient.get('/test');

        expect(Cookies.remove).toHaveBeenCalledWith('auth_token');
        expect(Cookies.remove).toHaveBeenCalledWith('user_data');
        expect(toastManager.error).toHaveBeenCalledWith('401 | Unauthorized');
    });

    it('should show success toast if message is present in response', async () => {
        fetchSpy.mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({ data: 'test', message: 'Success!' }),
        } as Response);

        await httpClient.post('/test', { foo: 'bar' });

        expect(toastManager.success).toHaveBeenCalledWith('Success!');
    });

    it('should handle network errors', async () => {
        fetchSpy.mockRejectedValue(new TypeError('Failed to fetch'));

        const result = await httpClient.get('/test');

        expect(result).toBeNull();
        expect(toastManager.error).toHaveBeenCalledWith('Network error: Could not connect to the server');
    });

    it('should return null for non-ok responses', async () => {
        fetchSpy.mockResolvedValue({
            ok: false,
            status: 404,
            json: async () => ({ message: 'Not Found' }),
        } as Response);

        const result = await httpClient.get('/invalid');

        expect(result).toBeNull();
        expect(toastManager.error).toHaveBeenCalledWith('404 | Not Found');
    });
});
