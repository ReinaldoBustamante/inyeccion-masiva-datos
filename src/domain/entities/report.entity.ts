import { Envs } from "../../config"
import { Check, ReportType, Comment, Disease, Label } from "../types/report.types"

export class ReportEntity {
    private readonly idGlobal: string;
    private readonly uuid: string;
    private readonly weight: number;
    private readonly shoot: Date;
    private readonly metadata: any;
    private readonly comment: Comment[]
    private readonly check: Check[]
    private readonly disease: Disease[]
    private readonly labels: Label[]
    private readonly revisado: boolean
    private readonly pcr: boolean
    private readonly images: any
    private readonly enterprise: number

    constructor({ attributes }: ReportType) {
        const {
            idGlobal,
            uuid,
            weight,
            shoot,
            metadata,
            comment,
            check,
            disease,
            labels,
            revisado,
            pcr,
            images
        } = attributes

        this.idGlobal = idGlobal
        this.uuid = uuid
        this.weight = weight
        this.shoot = shoot
        this.metadata = metadata
        this.comment = comment.map(c => {
            const { id, ...rest } = c
            return rest
        })
        this.check = check.map(c => {
            const { id, ...rest } = c
            return rest
        })
        this.disease = disease.map(d => {
            const { id, ...rest } = d
            return rest
        })
        this.labels = labels.map(l => {
            const { id, ...rest } = l
            return rest
        })
        this.revisado = revisado
        this.pcr = pcr
        this.images = images?.data?.map(({ attributes }: any) => attributes.url) || [];
        this.enterprise = Envs.getEnvs().enterpriseId
    }

    public toJSON(){
        return {
            idGlobal: this.idGlobal,
            uuid: this.uuid,
            weight: this.weight,
            shoot: this.shoot,
            metadata: this.metadata,
            comment: this.comment,
            check: this.check,
            disease: this.disease,
            labels: this.labels,
            revisado: this.revisado,
            pcr: this.pcr,
            images: this.images,
            enterprise: this.enterprise
        }
    }
}