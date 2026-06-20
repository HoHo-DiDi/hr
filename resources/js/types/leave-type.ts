export interface LeaveType {
    id: number;
    name: string;
    symbol: string;
    yearly_reset: number; 
    is_paid: boolean;
    is_refundable: boolean;
    description?: string | null; 
}