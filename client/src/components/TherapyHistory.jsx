import { format } from "date-fns"

export default function therapyHistory({ patient, hospital, machine, therapy }) {
    return (
        <li className="listed-therapy-history">
            <div>
                <p>Terapia iniziata il {format(therapy.startDate, 'dd/MM/yyyy')} e terminata il {format(therapy.endDate, 'dd/MM/yyyy')}</p>
            </div>
            {(patient || hospital) ? (
                <div>
                    <p>La macchina  assegnata aveva motore {therapy.machine.motor} con seriale {therapy.machine.serialNumber}</p>
                    <p>Referente Terapia: {therapy.referer.name + ' ' + therapy.referer.lastName} TEL: {therapy.referer.phone}</p>
                    <p>Note</p>
                    <p>{therapy.notes}</p>
                </div>

            ) : (
                <>
                    {therapy.patient &&
                        <div>
                            <p>Macchina assegnata a {therapy.patient.name + ' ' + therapy.patient.lastName + ' di ' + therapy.patient.city}</p>
                            <p>TEL: {therapy.patient.phone}</p>
                            <p>Note:</p>
                            <p>{therapy.notes}</p>
                            <p>Referente Terapia: {therapy.referer.name + ' ' + therapy.referer.lastName} TEL: {therapy.referer.phone}</p>
                        </div>}
                    {therapy.hospital &&
                        <div>
                            <p>Macchina assegnata a ospedale {therapy.hospital.name} di {therapy.hospital.city}</p>
                            <p>Note:</p>
                            <p>{therapy.notes}</p>
                            <p>Referente Terapia: {therapy.referer.name + ' ' + therapy.referer.lastName} TEL: {therapy.referer.phone}</p>
                        </div>}

                </>

            )}

        </li>
    )
}