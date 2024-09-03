import { ReportType } from "../domain";
import axios from 'axios';

interface DataRepositoryProps {
    rootAPIUrl: string;
    rootAPIToken: string;
    pageSize: number;
};

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

export class DataService {

    public static async extractData(props: DataRepositoryProps) {
        const { rootAPIUrl, rootAPIToken, pageSize } = props;
        let a = true;
        let page = 1;
        const reports: ReportType[] = [];

        while(a){
            const response = await fetch(`${rootAPIUrl}/api/reports?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=comment,check,disease,labels,images`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${rootAPIToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const { data, meta } = (await response.json()) as ReportsResponse;
            reports.push(...data);

            if(page === meta.pagination.pageCount) {
                a = !a;
            };

            page += 1;
        };

        return reports;
    };


    public static async uploadData(){
        console.log('data subida')
    }
};