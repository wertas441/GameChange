import {serverApi, getTokenHeaders, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {Ticket} from "@/types/support";

export async function getTicketList(tokenValue: string) {

    const payload = {
        headers: getTokenHeaders(tokenValue),
    };

    try {
        const { data } = await serverApi.get<BackendApiResponse<{ tickets: Ticket[] }>>(`/support/tickets`, payload);

        return data.data?.tickets ?? [];
    } catch (error) {
        if (showErrorMessage) console.error('get tickets list error:', error);

        return undefined;
    }
}

export async function getTicketDetails(ticketId: string, tokenValue: string) {
    const payload = {
        headers: getTokenHeaders(tokenValue),
    };

    try {
        const { data } = await serverApi.get<BackendApiResponse<{ ticketDetails: Ticket }>>(`/support/ticket?ticketId=${encodeURIComponent(ticketId)}`, payload);

        return data.data?.ticketDetails ?? undefined;
    } catch (error){
        if (showErrorMessage) console.error('get ticketDetails error:', error);

        return undefined;
    }
}

export async function getTicketHistory(tokenValue: string) {
    const payload = {
        headers: getTokenHeaders(tokenValue),
    };

    try {
        const { data } = await serverApi.get<BackendApiResponse<{ tickets: Ticket[] }>>(`/support/tickets/history`, payload);

        return data.data?.tickets ?? [];
    } catch (error) {
        if (showErrorMessage) console.error('get tickets histroy error:', error);

        return undefined;
    }
}

export async function deleteTicket(tokenValue: string, ticketId: number):Promise<void> {

    const payload = {
        headers: getTokenHeaders(tokenValue),
        data: { ticketId },
    };

    try {
        await serverApi.delete<BackendApiResponse>(`/support/ticket`, payload);

        return;
    } catch (error) {
        if (showErrorMessage) console.error('delete ticket error:', error);

        return ;
    }
}