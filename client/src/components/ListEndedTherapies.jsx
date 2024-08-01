import { format } from "date-fns"


export default function ListEndedTherapies({ finishedTherapies }) {

    function handleEdit(e) {
        e.preventDefault();
        console.log(e.target)
    }
    return (
        <ul className="ended-therapies-list">
            {finishedTherapies.map((therapy) =>
                <li key={therapy._id} className="listed-ended-therapy">
                    <div className="info-date">
                        <p>Terapia iniziata il <input type="date" defaultValue={format(therapy.startDate, 'yyyy-MM-dd')} disabled />{/*{format(therapy.startDate, 'dd/MM/yyyy')}*/} e terminata il {format(therapy.endDate, 'dd/MM/yyyy')}</p>
                    </div>
                    <div className="info-macchina">
                        <p>Macchina: {therapy.machine.motor + ' ' + therapy.machine.serialNumber}</p>
                    </div>
                    <p>Assegnata a:</p>
                    {therapy.patient ? (
                        <div className="info-paziente">
                            <p>{therapy.patient.name + ' ' + therapy.patient.lastName + ' di ' + therapy.patient.city + ' TEL: ' + therapy.patient.phone}</p>
                        </div>
                    ) : (
                        <div className="info-ospedale">
                            <p>Ospedale:</p>
                            <p>{therapy.hospital.name}</p>
                        </div>

                    )}

                    <div className="btns-nav">
                        <button>Ritira</button>
                        <button onClick={handleEdit}>Modifica</button>
                    </div>

                </li>
            )}
        </ul>

    )

}