import { useEffect, useState } from "react";
import { getDestinos } from "../api/destinos";
import DestinoCard from "../components/DestinoCard";

function Destinos() {
    const [destinos, setDestinos] = useState([]);

    useEffect(() => {
        getDestinos().then(data => setDestinos(data));
    }, []);

    const filtrar = (query) => {
        getDestinos(query).then(data => setDestinos(data));
    };

    <Filtros onFiltrar={filtrar} />

    return (
        <section className="destinos">
        {destinos.map(destino => (
            <DestinoCard key={destino._id} destino={destino} />
        ))}
        </section>
    );
}

export default Destinos;
