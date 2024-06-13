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

- **Gestione del caching**:
  Quando si utilizza il metodo GET con l'oggetto `response`, i gestori di route sono cachati di default. Tuttavia, per evitare il caching, ci sono vari modi:

  - Configurare la dynamic mode scegliendo `force-dynamic` al posto di `auto`, in modo da eseguire il gestore ad ogni richiesta dell'utente.
  - Usare l'oggetto `request` con il metodo GET.
  - Usare funzioni dinamiche come `headers()` e `cookies()`.
  - Usare altri metodi HTTP al posto di GET.

- **Middleware**:
  I middleware permettono di intercettare e controllare il flusso di richieste e risposte, migliorando funzionalità quali ridirezionamento, riscrittura URL, autenticazione, gestione di headers e cookies e così via. Vanno indicati nel file `middleware.ts` o `middleware.js` nella cartella `src` e permettono di specificare in quali path saranno attivi tramite custom matcher config e dichiarazioni condizionali.

- **CSR (Client-Side Rendering)**:
  Il codice del componente è trasformato in una UI direttamente nel browser, questo porta a problemi di velocità e di SEO siccome si ha un div principale gestito tutto dal browser.

- **SSR (Server-Side Rendering)**:
  Il rendering avviene lato server, risolvendo i problemi del CSR ma richiedendo l'hydration lato client che avviene in maniera atomica quando tutto l'albero dei componenti nel browser è identico a quello generato dal server. Ciò rende SSR consigliato per renderizzare pagine sulla base delle richieste utente e per contenuti personalizzati come ad esempio i feed dei social media che dipendono dall'utente loggato, ma prima del rendering è necessario attendere il fetching che i componenti richiedono. Questo crea un problema a cascata per cui tutto deve essere pronto prima che l'utente possa eseguire interazioni.

- **SSG (Static-Site Generation)**:
  Avviene in fase di build quando l'applicazione viene deployata sul server, quindi le pagine vengono già renderizzate. Ciò rende SSG ideale per contenuti che non variano spesso, come i post dei blog.

- **Hydration**:
  React prende il controllo del browser e ricostruisce l'albero dei componenti sulla base dell'HTML servito, inserendo gli elementi interattivi e collegando a loro la logica JS. Questo implica l'inizializzazione dello stato, il collegamento di gestori di eventi e in generale l'impostazione delle funzionalità dinamiche.

- **Componente Suspense per SSR**:
  Il componente Suspense per SSR consente lo streaming HTML nel server e l'hydration selettiva nel client. Questo consente di non dover attendere che venga fetchato tutto per poter mostrare qualcosa e renderlo interattivo, inoltre è possibile integrare le sezioni che rallenterebbero l'HTML iniziale senza dover attendere che ciò avvenga.

- **Code Splitting**:
  Il code splitting si applica tramite `React.lazy` e permette di indicare specifici segmenti di codice come non immediatamente necessari per il caricamento, al fine di segnalare al bundler di segregarli in tags script separati.

- **RSC (React Server Components)**:
  RSC è un'architettura pensata per avere sia componenti client che server. L'app router in Next.js è costruito attorno a questa architettura. Rispetto ai classici componenti client, i componenti server riguardano codice che non viene mai scaricato dal client, riducendo quindi la dimensione del bundle, permettendo l'accesso diretto a risorse lato server, migliorando la sicurezza, migliorando l'efficienza del data fetching, permettendo caching dovuto al rendering lato server, velocizzando il caricamento della pagina e l'FCP (first contentful paint), migliorando la SEO e lo streaming in blocchi. I RSC non possono gestire direttamente clicks e interazioni. Mentre i server components sono renderizzati solo lato server, i client components sono renderizzati una volta lato server e poi lato client.

- **Strategie di Server Rendering**:

  - Rendering statico:
    - Strategia di default, usata dall'app router, che permette di buildare la pagina una volta, cacharla in una CDN e servirla a diversi client, migliorando le prestazioni.
    - Consigliata per pagine di blog, prodotti di e-commerce, documentazione e pagine di marketing.
    - Questa tecnica consiste nel generare pagine HTML in fase di build. Insieme all'HTML, per ogni componente viene creato un RSC payload e i pezzi di JavaScript vengono prodotti per l'hydration che avviene nel browser del client.
    - Notare come in development mode, la pagina viene pre-renderizzata per ogni richiesta, mentre in produzione ciò avviene solo quando si esegue il comando di build. Navigando direttamente verso una route, viene servito il corrispondente file HTML, navigando verso una route a partire da un'altra route, la route viene creata lato client usando l'RSC payload e i pezzi di JavaScript, senza altre richieste verso il server.
  - Rendering dinamico:
    - Strategia che permette di renderizzare le route in fase di richiesta.
    - Consigliata quando una route ha dati personalizzati per l'utente o contiene informazioni che si possono sapere solo in fase di richiesta, come cookies e parametri di ricerca dell'URL.
    - Consigliata per siti di notizie, pagine di e-commerce personalizzate e feeds dei social media.
    - Se durante il rendering ci si accorge di una funzione dinamica, Next.js passerà al rendering dinamico per l'intera route in fase di richiesta. Queste funzioni dinamiche sono cookies(), headers() e searchParams.
  - Streaming:
    - Strategia, integrata di default nell'app router di Next.js, che permette rendering di UI progressivi dal server.
    - Il lavoro è diviso in pezzi e streammato al client appena è pronto. Questo permette agli utenti di vedere subito parti di pagina, prima che sia finito il rendering dell'intero contenuto.
    - Lo streaming velocizza il caricamento iniziale della pagina e il rendering degli elementi della UI che si affidano a fetch lenti di dati, che altrimenti bloccherebbero il rendering dell'intera route.

- **Prefetching**:
  Tecnica usata per precaricare una route in background prima che l'utente ci navighi. Le route statiche vengono prefetchate e cachate di default.

- **Pattern di composizione server e client**:

  - Server components: sono ottimi per fetch di dati, accesso diretto a risorse backend, protezione di informazioni (come token di accesso e chiavi API), riduzione del JavaScript lato client tramite mantenimento di grandi dipendenze lato server.
    - Codice solo lato server: certi moduli o funzioni che utilizzano più librerie e variabili d'ambiente e interagiscono con un database o processano informazioni confidenziali non dovrebbero finire nel client. Se ciò accadesse, potrebbe ingrandire la dimensione del bundle, oltre che esporre chiavi segrete, query del database e logiche sensibili.
    - Pacchetto server-only: fornisce un errore in fase di build se si sta importanto in un client component un modulo che dovrebbe stare solo lato server.
    - Pacchetti di terze parti: alcuni pacchetti che solitamente utilizzano funzionalità lato client non fanno ancora uso di use client, quindi potrebbero avere problemi se utilizzati in server components. Per risolvere ciò, si possono avvolgere questi componenti nei propri client components.
    - Context providers: solitamente renderizzati sotto la root di un'applicazione per condividere globalmente stato e logica dell'applicazione, non sono supportati dai server components. Per risolvere ciò, si può creare un context e renderizzare il suo provider in un client component separato.
  - Client components: sono ottimi per aggiungere interattività, gestire event listeners, gestire lo stato e gli effetti del ciclo di vita usando vari hooks, utilizzare API esclusive del browser, utilizzare hooks personalizzati e i componenti React Class. Si consiglia di tenerli più in basso possibile nel proprio albero di componenti perché, utilizzando use client, i loro componenti figli diventeranno anch'essi client components.
    - Codice solo lato client: l'interazione con funzionalità specifiche del browser come ad esempio il DOM, l'oggetto window e il localStorage non sono disponibili lato server. Assicurarsi che questo codice sia eseguito solo lato client previene errori durante l'SSR.
    - Pacchetto client-only: fornisce un errore in fase di build se si sta importanto in un server component un modulo che dovrebbe stare solo lato client.
    - Siccome i client components sono renderizzati dopo dei server components, non si può importare un server component in un modulo client component siccome quest'ultimo farà una richiesta al server. Un workaround però consiste nel passare come prop il server component al client component.

- **Data fetching**:
  - L'app router utilizza l'architettura RSC che permette di fetchare dati utilizzando sia server components che client components.
    - Utilizzo dei server components: è vantaggioso perché questi hanno accesso diretto alle risorse lato server (come database o file system) e supportano varie configurazioni per caching e rivalidazione. Questo minimizza inoltre la necessità di calcoli lato client.
      - L'architettura RSC nell'app router introduce il supporto per le keywords async e await nei componenti lato server. Questo permette di definire il componente come una funzione asincrona.
      - Mentre in React si gestiscono questi stati creando variabili separate e renderizzando in modo condizionale la UI sulla base dei loro valori, per implementare uno stato di caricamento è sufficiente definire ed esportare un componente React in loading.tsx e per gestire errori è sufficiente definire ed esportare un componente React in error.tsx.
      - Data Cache: di default, Next.js cacha i valori restituiti dalle fetch in una cache lato server che mantiene il risultato delle data fetch tra le richieste in arrivo. Questo serve per migliorare le prestazioni e ridurre i costi eliminando la necessità di ri-fetchare i dati dalla fonte ad ogni richiesta.
        - I dati della cache si trovano in .next/cache/fetch-cache.
        - La cache si può disabilitare per le singole data fetch utilizzando l'opzione cache no-store, ma una volta specificata questa opzione per una fetch, anche le richieste successive non saranno cachate, perciò è bene specificare le fetch che devono utilizzare la cache prima di quelle che non la devono utilizzare.
        - Di default, Next.js applicherà il caching alle fetch che occorrono prima che le funzioni dinamiche (cookies(), headers(), searchParams) vengano utilizzate e non applicherà il caching alle fetch successive alle funzioni dinamiche.
    - Utilizzo dei client components: solitamente viene gestito tramite librerie di terze parti, come ad esempio TanStack Query.



Fatto fino al [video 68](https://www.youtube.com/watch?v=PlgDOhWFOno&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=68) compreso.
