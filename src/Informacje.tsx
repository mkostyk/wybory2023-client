import MenuInformacje from "./MenuInformacje";

function Informacje() {
  return (
    <div className="Informacje">
        <MenuInformacje />
        <div style={{width: "50%", textAlign: "left", margin: "auto", padding: '2rem'}}>
            Wyniki są na bieżąco (co ok. 15 minut) pobierane z PKW, następnie przeliczane na mandaty, które są przydzielane do 1 z 4 kategorii:
            <ul>
                <li>Tossup: Niby ten mandat obecnie do kogoś należy, ale nie należy się do tego przywiązywać, trwa o niego zacięta walka</li>
                <li>Leaning: Partia obecnie posiadająca ten mandat może mieć o 10% niższe poparcie w pozostałych komisjach i dalej go utrzyma</li>
                <li>Likely: Partia obecnie posiadająca ten mandat może mieć o 25% niższe poparcie w pozostałych komisjach i dalej go utrzyma</li>
                <li>Safe: Partia obecnie posiadająca ten mandat może mieć o 40% niższe poparcie w pozostałych komisjach i dalej go utrzyma</li>
            </ul>

            <footer>
                <a href="https://github.com/mkostyk">Autor: Michał Kostyk</a>
            </footer>
        </div>
    </div>
  );
}

export default Informacje;
