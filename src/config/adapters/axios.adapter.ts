import axios from "axios";
import { ReportAttributes, ReportType } from "../../domain";


interface ReportsResponse {
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
    data: ReportType[];
};

export class Axios {
    public static async getData(url: string, token: string, page = 1, pageSize = 750) {
        const response = await axios.get<ReportsResponse>(`${url}/api/reports`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            params: {
                'pagination[page]': page,
                'pagination[pageSize]': pageSize,
                'populate': 'comment,check,disease,labels,images'
            }
        });
        return response
    }

    public static async postData(payload: ReportAttributes, url: string, token: string) {

        const response = await axios.post(`${url}/api/reports`, { data: payload }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })

        return response


    }
}