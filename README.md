 **Acceptance Kriterierna:**

1. **Boka Banor**
   - Formulärfält: Formuläret tillåter användare att ange datum, tid, antal banor och antal spelare.
   - Inlämning: Formuläret skickar bokningsuppgifter och förväntar sig ett svar som innehåller bokningsinformation.

2. **Hantera Skostorlekar**
   - Lägg till Skostorlek: Användare kan lägga till skostorlekar för varje spelare. Varje tillagt skostorleksfält måste vara unikt.
   - Ta bort Skostorlek: Användare kan ta bort skostorleksfält.

3. **Visa Bokningsbekräftelse**
   - Bokningsdetaljer: Bekräftelsekomponenten visar bokningsdetaljer inklusive datum, tid, antal spelare, banor, boknings-ID och pris.
   - Aktivt/Inaktivt Tillstånd: Om ingen bokning är aktiv visas meddelandet "inga bokning gjord!".

4. **Navigering**
   - Toggle Navigeringsmeny: Klick på menyk ikonen växlar synligheten av bokningslänken.
   - Navigera till Bokningsvy: Klick på bokningslänken anropar `setConfirmation` och navigerar tillbaka till bokningsvyn.

5. **Skicka Bokning**
   - POST Begäran: En POST-begäran till boknings-API:t med nödvändiga headers och bokningsdetaljer returnerar en bekräftelse med bokningsnummer och totalbelopp.
