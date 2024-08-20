import { format } from "date-fns"

export default function therapyHistory({ patient, hospital, machine, therapy }) {
    return (
        <li className="listed-therapy-history">
            <div className="history-date">
                <p>Terapia iniziata il {format(therapy.startDate, 'dd/MM/yyyy')} e terminata il {format(therapy.endDate, 'dd/MM/yyyy')}</p>
            </div>
            {(patient || hospital) ? (
                <div className="history-info">
                    <div className="history-machine">
                        <p>la macchina assegnata era:</p>
                        <p>{therapy.machine.motor} con seriale {therapy.machine.serialNumber}</p>
                    </div>
                    <div className="history-referer">
                        <p>Il referente era:</p>
                        <p>{therapy.referer.name + ' ' + therapy.referer.lastName} TEL: {therapy.referer.phone}</p>
                    </div>
                    <div className="history-notes">
                        <p>Note</p>
                        <p>{therapy.notes}</p>
                    </div>

                </div>

            ) : (
                <>
                    {therapy.patient &&
                        <div className="history-info">
                            <div className="history-patient">
                                <p>Macchina assegnata a:</p>
                                <p>{therapy.patient.name + ' ' + therapy.patient.lastName + ' di ' + therapy.patient.city}</p>
                                <p>{'TEL: ' + therapy.patient.phone}</p>
                            </div>
                            <div className="history-referer">
                                <p>Il referente era:</p>
                                <p>{therapy.referer.name + ' ' + therapy.referer.lastName} TEL: {therapy.referer.phone}</p>
                            </div>
                            <div className="history-notes">
                                <p>Note:</p>
                                <p>{therapy.notes}</p>
                            </div>
                        </div>}
                    {therapy.hospital &&
                        <div className="history-info">
                            <div className="history-hospital">
                                <p>Macchina assegnata a ospedale:</p>
                                <p>{therapy.hospital.name} di {therapy.hospital.city}</p>
                            </div>
                            <div className="history-referer">
                                <p>Il referente era:</p>
                                <p>{therapy.referer.name + ' ' + therapy.referer.lastName} TEL: {therapy.referer.phone}</p>
                            </div>
                            <div className="history-notes">
                                <p>Note:</p>
                                <p>{therapy.notes}</p>
                            </div>
                        </div>}

                </>

            )}

        </li>
    )
}