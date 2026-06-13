# 🧮 Logica di Calcolo del Regalo

Il calcolo è basato interamente su un sistema di **percentuali e pesi**, rendendolo resistente all'inflazione. L'algoritmo non usa prezzi fissi (tranne quelli inseriti da te per il costo del piatto), ma scala tutto in base alla "spesa stimata" degli sposi.

---

## 1. La Base: Il Costo del Ricevimento

Tutto parte dai due valori che inserisci per il costo del piatto (Min e Max):

- **Base Minima** = `Adulti * CostoPiattoMin + Bambini * (CostoPiattoMin * PesoBambinoRelazione)`
- **Base Massima** = `Adulti * CostoPiattoMax + Bambini * (CostoPiattoMax * PesoBambinoRelazione)`

---

## 2. Il Moltiplicatore della Relazione (Il "Peso")

Ogni relazione ha un moltiplicatore che indica quanto "oltre" il semplice costo del pasto dovresti spingerti:

| Relazione | Peso Adulto (Min - Max) | Peso Bambino |
| :--- | :--- | :--- |
| **Amico Standard** | 1.0x - 1.0x (Copre il piatto) | 0.33x |
| **Amico Stretto** | 1.2x - 1.4x | 0.53x |
| **Migliore Amico** | 1.6x - 2.0x | 0.66x |
| **Testimone** | 3.3x - 4.4x | 1.0x |
| **Genitore** | 4.0x - 5.5x | 1.0x |
| **Fratello/Sorella** | 2.6x - 3.8x | 1.0x |

*Esempio: Se sei un Testimone e il piatto costa 150€, la tua base di partenza sarà circa 500€ (150 * 3.33).*

---

## 3. Modificatori di Contesto (Percentuali)

Una volta calcolata la base per relazione, vengono applicati i bonus/malus:

### 🌍 Area Geografica

- **Nord**: +15%
- **Centro**: (Base)
- **Sud**: -10% (Storicamente il costo della vita/ricevimento è diverso, ma i regali sono spesso più alti, questo bilancia la stima del piatto).

### 🥂 Tipo di Evento

- **Giornata Intera**: 100%
- **Mezza Giornata**: -20%
- **Solo Serale**: -40%

### ✨ Extra (Sommabili)

- **Legame Storico**: +15% sul minimo, +25% sul massimo.
- **Location di Lusso**: +20% su tutto.
- **Partecipazione Serenata**: +5% (Per coprire i costi extra degli sposi per l'evento pre-matrimonio).
- **Reciprocità (Match)**: +50% (Se vuoi fare un regalo "importante" perché hai ricevuto molto).

---

## 4. Detrazioni (Spese Vive)

Se hai spese per partecipare, l'algoritmo le sottrae parzialmente:

- **Viaggio/Hotel**: In base alla distanza, viene sottratta una quota delle spese totali (viaggio + hotel) che hai sostenuto:
    - **Distanza Lunga**: Sottrazione del **35%**.
    - **Distanza Media**: Sottrazione del **15%**.
- **Limite (Floor)**: Il calcolo garantisce sempre che tu non regali meno di quanto gli sposi spendano per il tuo pasto (Costo Piatto + 40% per i bambini). Non andrai mai "in debito" con gli sposi.

---

## 5. Capacità di Spesa (RAL)

Infine, il regalo viene riproporzionato in base alle tue possibilità:

- **Sotto i 20k**: -20%
- **Tra 35k e 55k**: +20%
- **Oltre 80k**: +60%

---

## 🛡️ Perché questa logica?

Usando le percentuali, se tra 5 anni un pranzo di nozze costerà 300€ a persona invece di 150€, ti basterà cambiare quel numero. Il "peso" del Testimone o del Genitore rimarrà matematicamente corretto rispetto al nuovo standard economico.
