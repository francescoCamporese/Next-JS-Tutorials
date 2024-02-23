[# Playlist 1](https://www.youtube.com/playlist?list=PLvnNG6eeZX0HqMCVBPTcuOtOgy_WvKvnR)

- **Il meccanismo di routing è basato sul file system**: quindi gli URL accessibili dipendono da file e cartelle.

- **Next.js fornisce Server Side Rendering (SSR, elaborazione lato server) e Static Site Generation (SSG, elaborazione in fase di build)**:
  - Client Side Rendering (CSR) è inizialmente più lento di SSR, ma le successive richieste sono più veloci con CSR perché SSR farà un refresh di pagina.
  - In quanto a SEO, SSR è migliore di CSR.
  - SSG è il più veloce e migliore in quanto a SEO.

- **Metodi di fetching**:
  - `getStaticProps()` è per SSG e si usa insieme a `getStaticPaths()` per indicare a Next.js di generare i vari percorsi (routes) per le varie pagine (si pensi a un blog che ha una pagina per ciascun post).
  - `getServerSideProps()` è per SSR.

- **Build**:
  - Usando SSG: `npm run build` crea una cartella `.next` dove si possono trovare le pagine generate automaticamente.
  - Usando SSR: `npm run build` crea una cartella `.next`, ma per ottenere una copia statica bisogna eseguire anche `npm run export`, che crea una cartella `out`.

[# Playlist 2](https://www.youtube.com/playlist?list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI)

- **In Next.js, tutti i componenti sono componenti server di default**:
  - Possono eseguire tasks come letture di file e fetching di dati da database, ma non possono usare hooks o manipolare interazioni dell'utente.
  - Per creare componenti client, si utilizza "use client" all'inizio.

- **Le route devono essere tutte nella cartella app**:
  - Ogni file corrispondente a una route deve avere estensione `.tsx` o `.js`.
  - Ogni cartella corrisponde a un segmento di path nell'URL.

- **Cartelle nascoste**:
  - Iniziano con `_` e si usano per separare la logica della UI da quella di routing e per organizzare i file internamente al progetto e nell'editor, oltre che per evitare eventuali conflitti con convenzioni future di Next.js.
  - Se si vuole usare l'underscore negli URL segments, la cartella deve iniziare con `%5F`.

- **Gruppi di cartelle**:
  - Composti da cartelle il cui nome è compreso tra parentesi tonde.
  - Servono per organizzare i file senza modificare gli URL.

- **Pagina not-found**:
  - Di default esiste una pagina not-found che si può sovrascrivere

- **Metadata API**:
  - Permette di definire metadata per ogni pagina.
  - Si possono esportare un oggetto metadata statico o una funzione `generateMetadata` dinamica.
  - Sia layout.tsx che page.tsx possono esportare metadata. Nel primo caso, si applicano a tutte le pagine che usano quel layout, nel secondo caso invece si applicano alla singola pagina.
  - I metadata si leggono in ordine dal livello della root al livello della pagina finale.
  - Quando ci sono metadata in più posti per la stessa route, vengono combinati. Ma i metadata della pagina sostituiscono quelli di layout se hanno le stesse proprietà.
  - Il title di default è di fallback per i route segments figli che non specificano un title, il title di template permette di indicare per i route segments figli eventuale prefisso e suffisso da usare nel title, mentre il title absolute permette di ignorare il title di template.

- **next/router**:
  - Permette di utilizzare le funzioni `push`, `replace`, `back`, `forward`.

- **File speciali**:
  - `page.tsx`
  - `layout.tsx`
  - `template.tsx`
  - `not-found.tsx`
  - `loading.tsx`
  - `error.tsx`
  - `default.tsx`
  - `route.ts`

- **Templates**:
  - I template sono simili ai layout perché avvolgono i layout figli o pagine.
  - Con i template, quando un utente naviga tra route che condividono lo stesso template, viene montata una nuova istanza del componente, gli elementi del DOM vengono ricreati, lo stato non viene preservato e gli effetti vengono ri-sincronizzati.
  - Un template può essere definito esportando un componente React da un file `template.js` o `template.tsx`.
  - Similmente ai layout, anche i template dovrebbero accettare una prop figlia che renderizzerà i nested segments nella route.

- **File `loading.tsx`**:
  - Il file loading permette di mostrare uno stato di caricamento mentre l'utente naviga verso una nuova route, in modo da fargli capire che l'azione è stata presa in atto e in modo da far sembrare l'applicazione più responsive.
  - Next.js permette di creare layout condivisi che rimangono interattivi durante il caricamento di nuovi route segments, così gli utenti possono interagire anche mentre il contenuto principale sta per essere fetchato.

- **File `error.tsx`**:
  - Il file error permette di avvolgere automaticamente un route segment e i suoi figli in un React Error Boundary.
  - Si possono creare UI per errori cucite su misura grazie alla gerarchia del file system, isolare errori tenendo il resto dell'applicazione funzionante, dare possibilità di riprendersi da un errore senza ricaricare interamente la pagina.
  - Gli errori salgono al più vicino error boundary genitore, quindi un file `error.tsx` tiene conto degli errori di tutti i suoi segments figli.
  - Posizionare più `error.tsx` a differenti livelli permette di ottenere una gestione degli errori più granulare.

- **Route Parallele**:
  - Le route parallele sono un meccanismo di routing che permette di renderizzare simultaneamente più pagine con lo stesso layout.
  - Le route parallele sono definite utilizzando una funzionalità chiamata slots, che permette di strutturare il contenuto in maniera modulare.
  - Per definire uno slot, si precede il nome della cartella con una `@`, quindi ogni slot viene automaticamente passato come prop al suo relativo file `layout.tsx`.
  - Ogni slot può funzionare come una mini applicazione, con il suo loading, la sua gestione degli errori, la sua navigazione e la sua gestione dello stato. Ciò torna utile se le sezioni della pagina caricano a velocità diverse.
  - In caso di navigazione nella UI, Next.js conserva lo stato precedentemente attivo dello slot indipendentemente dai cambiamenti nell'URL.
  - In caso di ricaricamento della pagina, Next.js cerca un `default.tsx` internamente ad ogni slot perché quel file fornisce il contenuto di default che viene renderizzato nella UI, infatti se il file non è presente verrà renderizzato un 404.

- **Intercettare le Route**:
  - Intercettare le route permette di intercettare o fermare il comportamento di routing di default per presentare un'altra vista o componente mentre si naviga nella UI, preservando la route per scenari come ad esempio ricaricamenti di pagina.
  - Intercettare le route è quindi utile per mostrare una route mentre si tiene il contesto della pagina corrente. Convenzioni per intercettare le route:
    - `(.)` Matchare segmenti sullo stesso livello.
    - `(..)` Matchare segmenti un livello sopra.
    - `(..)(..)` Matchare segmenti due livelli sopra.
    - `(...)` Matchare segmenti dalla cartella root dell'app.

- **Gestori di Route**:
  - I gestori di route vengono eseguiti lato server e permettono di creare degli endpoint RESTful, in modo da dare il totale controllo sulla risposta.
  - Non c'è l'overhead dovuto alla creazione e configurazione di un server separato, ma è un ottimo modo per fare richieste ad API esterne.
  - I gestori di route sono l'equivalente delle API routes nel page router.

- **Headers HTTP**:
  - Gli headers HTTP rappresentano i metadata associati con una richiesta e risposta delle API.
  - Gli headers delle richieste sono inviati dal client e contengono informazioni utili al server riguardanti la richiesta.
  - Tra gli headers delle richieste ci sono `User-Agent` che identifica OS e browser, `Accept` che indica il tipo di contenuti che client può processare, `Authorization` che serve al client per autenticarsi al server.
  - Gli headers delle risposte sono inviati dal server e contengono informazioni utili al client riguardanti la risposta.
  - Tra gli headers delle risposte c'è `Content-Type` che indica al client il tipo di media della risposta.

- **Cookies**:
  - I cookies sono piccoli pezzi di dati che un server invia al browser, il quale può salvarli e inviarli al server tramite successive richieste.

Arrivato al [video 43](https://www.youtube.com/watch?v=5_cJFYZSiDM&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=43)
