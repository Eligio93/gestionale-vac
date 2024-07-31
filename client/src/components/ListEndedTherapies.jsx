export default function ListEndedTherapies({ finishedTherapies }) {
    return (
        <ul>
            {finishedTherapies.map((therapy) =>
                <li key={therapy._id}>
                    {therapy.patient ? (
                        <div className="info-paziente">
                            <p>Nome Paziente:</p>
                            <p>{therapy.patient.name + ' ' + therapy.patient.lastName}</p>
                        </div>
                    ) : (
                        <div className="info-ospedale">
                            <p>Nome Ospedale:</p>
                            <p>{therapy.hospital.name}</p>
                        </div>

                    )}


                    <button>Ritira</button>
                </li>
            )}
        </ul>

    )

}