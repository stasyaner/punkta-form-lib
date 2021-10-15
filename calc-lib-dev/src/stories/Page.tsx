import { CalcForm } from "../CalcForm";
import "./page.css";

type PageProps = {
    numberOfForms: number;
};
export const Page: React.FC<PageProps> = ({ numberOfForms }) => (
    <div className="root">
        {new Array(numberOfForms).fill(null).map((_, formIdx) => (
            <CalcForm key={formIdx} id={`testForm${formIdx}`} />
        ))}
    </div>
);
