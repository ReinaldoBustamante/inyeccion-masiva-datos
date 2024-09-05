import { Axios } from "../config/adapters/axios.adapter";
import { ReportAttributes, ReportType } from "../domain";

interface DataRepositoryProps {
    rootAPIUrl: string;
    rootAPIToken: string;
    pageSize: number;
};

export class DataService {

    public static async extractData(props: DataRepositoryProps) {
        const { rootAPIUrl, rootAPIToken, pageSize } = props;
        let a = true;
        let page = 1;
        const reports: ReportType[] = [];

        while (a) {
            const response = await Axios.getData(rootAPIUrl, rootAPIToken, page, pageSize)
            const { data, meta } = response.data;
            reports.push(...data);

            if (page === meta.pagination.pageCount) {
                a = !a;
            };

            page += 1;
        };

        return reports;
    };


    public static async uploadData(data: ReportAttributes, outAPIUrl: string, outAPIToken: string) {
        try {
            await Axios.postData(data, outAPIUrl, outAPIToken)
            console.log(' Success');
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
};