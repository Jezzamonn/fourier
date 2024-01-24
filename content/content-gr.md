Οι μετασχηματισμοί Fourier είναι ένα εργαλείο που χρησιμοποιείται σε μια ολόκληρη δέσμη διαφορετικών πραγμάτων. Αυτή είναι μια εξήγηση του τι κάνει ένας μετασχηματισμός Fourier και μερικοί διαφορετικοί τρόποι που μπορεί να είναι χρήσιμος. Και πώς μπορείτε να φτιάξετε όμορφα πράγματα με αυτό, όπως αυτό:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

Θα εξηγήσω πώς λειτουργεί αυτό το animation και στην πορεία θα εξηγήσω τους μετασχηματισμούς Fourier!

Στο τέλος θα πρέπει να έχετε μια καλή ιδέα

     Τι κάνει ένας μετασχηματισμός Fourier
     Μερικές πρακτικές χρήσεις των μετασχηματισμών Fourier
     Μερικές άσκοπες αλλά ωραίες χρήσεις των μετασχηματισμών Fourier

Θα αφήσουμε έξω τα μαθηματικά και τις εξισώσεις προς το παρόν. Υπάρχουν ένα σωρό ενδιαφέροντα μαθηματικά πίσω από αυτό, αλλά είναι καλύτερα να ξεκινήσετε με το τι κάνει στην πραγματικότητα και γιατί θα θέλατε να το χρησιμοποιήσετε πρώτα. Αν θέλετε να μάθετε περισσότερα για το πώς, υπάρχουν μερικές περαιτέρω προτάσεις ανάγνωσης παρακάτω!

## Τι είναι λοιπόν αυτό το πράγμα;

Με απλά λόγια, ο μετασχηματισμός Fourier είναι ένας τρόπος να χωρίσουμε κάτι σε μια δέσμη ημιτονοειδών κυμάτων. Ως συνήθως, το όνομα προέρχεται από κάποιο άτομο που έζησε πριν από πολύ καιρό που ονομάζεται Fourier.

Ας ξεκινήσουμε με μερικά απλά παραδείγματα και ας προχωρήσουμε προς τα πάνω. Πρώτα θα δούμε τα κύματα - μοτίβα που επαναλαμβάνονται με την πάροδο του χρόνου.

Ακολουθεί ένα παράδειγμα κύματος:


<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

Αυτό το κυματιστό σχέδιο εδώ μπορεί να χωριστεί σε ημιτονοειδή κύματα. Δηλαδή, όταν αθροίσουμε τα δύο ημιτονοειδή κύματα, παίρνουμε πίσω το αρχικό κύμα.


<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

Ο μετασχηματισμός Fourier είναι ένας τρόπος για να πάρουμε το συνδυασμένο κύμα και να επαναφέρουμε κάθε ημιτονοειδές κύμα. Σε αυτό το παράδειγμα, μπορείτε σχεδόν να το κάνετε στο κεφάλι σας, κοιτάζοντας μόνο το αρχικό κύμα.


Γιατί; Αποδεικνύεται ότι πολλά πράγματα στον πραγματικό κόσμο αλληλεπιδρούν με βάση αυτά τα ημιτονοειδή κύματα. Συνήθως τις ονομάζουμε συχνότητες του κύματος.

Το πιο προφανές παράδειγμα είναι ο ήχος – όταν ακούμε έναν ήχο, δεν ακούμε αυτή τη σαθρή γραμμή, αλλά ακούμε τις διαφορετικές συχνότητες των ημιτονοειδών κυμάτων που συνθέτουν τον ήχο.

<button id="together-button" class="button">Play Full Wave</button>

<button id="split-button-1" class="button">Play High Frequency</button>

<button id="split-button-2" class="button">Play Low Frequency</button>


Το να μπορούμε να τα χωρίσουμε σε έναν υπολογιστή μπορεί να μας δώσει να κατανοήσουμε τι πραγματικά ακούει ένα άτομο. Μπορούμε να καταλάβουμε πόσο υψηλός ή χαμηλός είναι ένας ήχος ή να καταλάβουμε ποια νότα είναι.

Μπορούμε επίσης να χρησιμοποιήσουμε αυτή τη διαδικασία σε κύματα που δεν μοιάζουν σαν να είναι φτιαγμένα από ημιτονοειδή κύματα.

Ας ρίξουμε μια ματιά σε αυτόν τον τύπο. Ονομάζεται τετραγωνικό κύμα.



<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

Μπορεί να μην μοιάζει, αλλά μπορεί επίσης να χωριστεί σε ημιτονοειδή κύματα.



<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

Χρειαζόμαστε πολλά από αυτά αυτή τη φορά – τεχνικά ένα άπειρο ποσό για να το αντιπροσωπεύσουμε τέλεια. Καθώς προσθέτουμε όλο και περισσότερα ημιτονοειδή κύματα, το σχέδιο πλησιάζει όλο και πιο κοντά στο τετράγωνο κύμα με το οποίο ξεκινήσαμε.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">Play Wave</button>

Σύρετε το ρυθμιστικό πάνω για να παίξετε με τον αριθμό των ημιτονοειδών κυμάτων.


*Σύρετε το ρυθμιστικό πάνω για να παίξετε με τον αριθμό των ημιτονοειδών κυμάτων.*


Οπτικά, θα παρατηρήσετε ότι στην πραγματικότητα τα πρώτα ημιτονοειδή κύματα είναι αυτά που κάνουν τη μεγαλύτερη διαφορά. Με το ρυθμιστικό στα μισά, έχουμε το γενικό σχήμα του κύματος, αλλά είναι τρελό. Απλώς χρειαζόμαστε τα υπόλοιπα μικρά για να ισιώνουμε την τσαχπινιά.


Όταν ακούτε το κύμα, θα ακούτε τον ήχο να μειώνεται, γιατί αφαιρούμε τις υψηλότερες συχνότητες.

Αυτή η διαδικασία λειτουργεί έτσι για οποιαδήποτε επαναλαμβανόμενη γραμμή. Δώστε μια ευκαιρία, δοκιμάστε να σχεδιάσετε το δικό σας!


<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">Draw here!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">Play Wave</button>

*Μετακινήστε το ρυθμιστικό για να δείτε πώς καθώς προσθέτουμε περισσότερα ημιτονοειδή κύματα, πλησιάζει όλο και περισσότερο το σχέδιό σας*

Και πάλι, εκτός από την πρόσθετη ευκινησία, το κύμα φαίνεται αρκετά παρόμοιο με μόλις τα μισά ημιτονοειδή κύματα.

Μπορούμε πραγματικά να χρησιμοποιήσουμε το γεγονός ότι το κύμα είναι αρκετά παρόμοιο με το πλεονέκτημά μας. Χρησιμοποιώντας έναν μετασχηματισμό Fourier, μπορούμε να πάρουμε τα σημαντικά μέρη ενός ήχου και να αποθηκεύσουμε μόνο αυτά για να καταλήξουμε σε κάτι που είναι αρκετά κοντά στον αρχικό ήχο.

Κανονικά σε έναν υπολογιστή αποθηκεύουμε ένα κύμα ως μια σειρά από σημεία.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

Αυτό που μπορούμε να κάνουμε είναι να το αναπαραστήσουμε ως μια δέσμη ημιτονοειδών κυμάτων. Τότε μπορούμε να συμπιέσουμε τον ήχο αγνοώντας τις μικρότερες συχνότητες. Το τελικό μας αποτέλεσμα δεν θα είναι το ίδιο, αλλά θα ακούγεται αρκετά παρόμοιο με ένα άτομο.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

Αυτό ουσιαστικά κάνουν τα MP3, εκτός από το ότι είναι πιο έξυπνα για το ποιες συχνότητες κρατούν και ποιες πετούν.

Έτσι, σε αυτή την περίπτωση, μπορούμε να χρησιμοποιήσουμε μετασχηματισμούς Fourier για να κατανοήσουμε τις θεμελιώδεις ιδιότητες ενός κύματος και, στη συνέχεια, μπορούμε να το χρησιμοποιήσουμε για πράγματα όπως η συμπίεση.

Εντάξει, τώρα ας σκάψουμε περισσότερο στον μετασχηματισμό Fourier. Αυτό το επόμενο μέρος φαίνεται ωραίο, αλλά σας δίνει επίσης λίγο περισσότερη κατανόηση του τι κάνει ο μετασχηματισμός Fourier. Αλλά κυρίως φαίνεται κουλ.

## Επίκυκλοι

Τώρα στην αρχή, είπα ότι χωρίζει τα πράγματα σε ημιτονοειδή κύματα. Το θέμα είναι ότι τα ημιτονοειδή κύματα που δημιουργεί δεν είναι απλώς κανονικά ημιτονοειδή κύματα, αλλά είναι 3D. Θα μπορούσατε να τα ονομάσετε "σύνθετα ημιτονοειδή". Ή απλώς «σπείρες».

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

Αν ρίξουμε μια ματιά από το πλάι, μοιάζουν με ημιτονοειδή κύματα. Από μπροστά, όμως, αυτά μοιάζουν με κύκλους.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

Μέχρι στιγμής, όλα όσα κάναμε απαιτούσαν μόνο τα κανονικά 2D ημιτονοειδή κύματα. Όταν κάνουμε έναν μετασχηματισμό Fourier σε κύματα 2D, τα σύνθετα μέρη ακυρώνονται και καταλήγουμε σε ημιτονοειδή κύματα.

Αλλά μπορούμε να χρησιμοποιήσουμε τα τρισδιάστατα ημιτονοειδή κύματα για να κάνουμε κάτι διασκεδαστικό να μοιάζει με αυτό:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

Τι συμβαίνει εδώ?

Λοιπόν, μπορούμε να σκεφτούμε το σχέδιο ως ένα τρισδιάστατο σχήμα λόγω του τρόπου με τον οποίο κινείται στο χρόνο. Αν φανταστείτε το χέρι να σχεδιάζεται από ένα άτομο, οι τρεις διαστάσεις αντιπροσωπεύουν πού βρίσκεται η άκρη του μολυβιού του εκείνη τη στιγμή. Οι διαστάσεις x και y μας λένε τη θέση, και τότε η διάσταση του χρόνου είναι ο χρόνος εκείνη τη στιγμή.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

Τώρα που έχουμε ένα τρισδιάστατο μοτίβο, δεν μπορούμε να χρησιμοποιήσουμε τα κανονικά 2D ημιτονοειδή κύματα για να το αναπαραστήσουμε. Ανεξάρτητα από το πόσα από τα δισδιάστατα ημιτονοειδή κύματα αθροίσουμε, δεν θα έχουμε ποτέ κάτι 3D. Χρειαζόμαστε λοιπόν κάτι άλλο.

Αυτό που μπορούμε να χρησιμοποιήσουμε είναι τα τρισδιάστατα σπειροειδή ημιτονοειδή κύματα από πριν. Αν αθροίσουμε πολλά από αυτά, μπορούμε να πάρουμε κάτι που μοιάζει με το τρισδιάστατο μοτίβο μας.

Θυμηθείτε, αυτά τα κύματα μοιάζουν με κύκλους όταν τα κοιτάμε από μπροστά. Το όνομα για το σχέδιο ενός κύκλου που κινείται γύρω από έναν άλλο κύκλο είναι επίκυκλος.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*Χρησιμοποιήστε το ρυθμιστικό παραπάνω για να ελέγξετε πόσοι κύκλοι υπάρχουν.*

Όπως και πριν, έχουμε μια αρκετά καλή προσέγγιση του μοτίβου μας με μερικούς μόνο κύκλους. Επειδή αυτό είναι ένα αρκετά απλό σχήμα, το μόνο που κάνουν είναι να κάνουν τις άκρες λίγο πιο έντονες.

Όλα αυτά ισχύουν για κάθε σχέδιο, πραγματικά! Τώρα είναι η ευκαιρία σας να παίξετε μαζί του.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">Draw here!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">Undo</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*Χρησιμοποιήστε το ρυθμιστικό για να ελέγξετε πόσοι κύκλοι χρησιμοποιούνται για το σχέδιό σας*

Και πάλι, θα δείτε για τα περισσότερα σχήματα, μπορούμε να τα προσεγγίσουμε αρκετά καλά με έναν μικρό αριθμό κύκλων, αντί να αποθηκεύσουμε όλους τους πόντους.

Μπορούμε να το χρησιμοποιήσουμε για πραγματικά δεδομένα; Λοιπόν, θα μπορούσαμε! Στην πραγματικότητα, έχουμε μια άλλη μορφή δεδομένων που ονομάζεται SVG, η οποία μάλλον κάνει καλύτερη δουλειά για τους τύπους σχημάτων που τείνουμε να δημιουργήσουμε. Έτσι, προς το παρόν, αυτό είναι πραγματικά μόνο για τη δημιουργία εντυπωσιακών μικρών gif.

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

Ωστόσο, υπάρχει ένας άλλος τύπος οπτικών δεδομένων που χρησιμοποιεί μετασχηματισμούς Fourier.

## JPEGs

Γνωρίζατε ότι οι μετασχηματισμοί Fourier μπορούν επίσης να χρησιμοποιηθούν σε εικόνες; Μάλιστα, το χρησιμοποιούμε συνέχεια, γιατί έτσι λειτουργούν τα JPEG! Εφαρμόζουμε τις ίδιες αρχές στις εικόνες – χωρίζουμε κάτι σε μια δέσμη ημιτονοειδών κυμάτων και στη συνέχεια αποθηκεύουμε μόνο τα σημαντικά.

Τώρα έχουμε να κάνουμε με εικόνες, χρειαζόμαστε έναν διαφορετικό τύπο ημιτονοειδούς κύματος. Πρέπει να έχουμε κάτι που ανεξάρτητα από την εικόνα που έχουμε, μπορούμε να προσθέσουμε ένα σωρό από αυτά τα ημιτονοειδή κύματα για να επιστρέψουμε στην αρχική μας εικόνα.

Για να γίνει αυτό, κάθε ημιτονοειδές κύμα μας θα είναι επίσης εικόνες. Αντί για ένα κύμα που είναι μια γραμμή, έχουμε τώρα εικόνες με ασπρόμαυρες ενότητες. Για να αναπαραστήσετε το μέγεθος ενός κύματος, κάθε εικόνα θα έχει περισσότερη ή λιγότερη αντίθεση.

Μπορούμε επίσης να τα χρησιμοποιήσουμε για να αναπαραστήσουμε το χρώμα με τον ίδιο τρόπο, αλλά ας ξεκινήσουμε με ασπρόμαυρες εικόνες προς το παρόν. Για να αναπαραστήσουμε άχρωμες εικόνες, χρειαζόμαστε μερικές εικόνες οριζόντιων κυμάτων,

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

Μαζί με μερικές εικόνες κάθετου κυμάτων.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

Από μόνες τους, μόνο οριζόντιες και κάθετες εικόνες δεν αρκούν για να αναπαραστήσουν τους τύπους εικόνων που λαμβάνουμε. Χρειαζόμαστε επίσης μερικά επιπλέον που θα πάρετε πολλαπλασιάζοντας τα δύο μαζί.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

Για μια εικόνα 8x8, εδώ είναι όλες οι εικόνες που χρειαζόμαστε.

<div class="img-component-container">
    <img src="img/components-0-0.png" class="img-component">
    <img src="img/components-0-1.png" class="img-component">
    <img src="img/components-0-2.png" class="img-component">
    <img src="img/components-0-3.png" class="img-component">
    <img src="img/components-0-4.png" class="img-component">
    <img src="img/components-0-5.png" class="img-component">
    <img src="img/components-0-6.png" class="img-component">
    <img src="img/components-0-7.png" class="img-component">
    <img src="img/components-1-0.png" class="img-component">
    <img src="img/components-1-1.png" class="img-component">
    <img src="img/components-1-2.png" class="img-component">
    <img src="img/components-1-3.png" class="img-component">
    <img src="img/components-1-4.png" class="img-component">
    <img src="img/components-1-5.png" class="img-component">
    <img src="img/components-1-6.png" class="img-component">
    <img src="img/components-1-7.png" class="img-component">
    <img src="img/components-2-0.png" class="img-component">
    <img src="img/components-2-1.png" class="img-component">
    <img src="img/components-2-2.png" class="img-component">
    <img src="img/components-2-3.png" class="img-component">
    <img src="img/components-2-4.png" class="img-component">
    <img src="img/components-2-5.png" class="img-component">
    <img src="img/components-2-6.png" class="img-component">
    <img src="img/components-2-7.png" class="img-component">
    <img src="img/components-3-0.png" class="img-component">
    <img src="img/components-3-1.png" class="img-component">
    <img src="img/components-3-2.png" class="img-component">
    <img src="img/components-3-3.png" class="img-component">
    <img src="img/components-3-4.png" class="img-component">
    <img src="img/components-3-5.png" class="img-component">
    <img src="img/components-3-6.png" class="img-component">
    <img src="img/components-3-7.png" class="img-component">
    <img src="img/components-4-0.png" class="img-component">
    <img src="img/components-4-1.png" class="img-component">
    <img src="img/components-4-2.png" class="img-component">
    <img src="img/components-4-3.png" class="img-component">
    <img src="img/components-4-4.png" class="img-component">
    <img src="img/components-4-5.png" class="img-component">
    <img src="img/components-4-6.png" class="img-component">
    <img src="img/components-4-7.png" class="img-component">
    <img src="img/components-5-0.png" class="img-component">
    <img src="img/components-5-1.png" class="img-component">
    <img src="img/components-5-2.png" class="img-component">
    <img src="img/components-5-3.png" class="img-component">
    <img src="img/components-5-4.png" class="img-component">
    <img src="img/components-5-5.png" class="img-component">
    <img src="img/components-5-6.png" class="img-component">
    <img src="img/components-5-7.png" class="img-component">
    <img src="img/components-6-0.png" class="img-component">
    <img src="img/components-6-1.png" class="img-component">
    <img src="img/components-6-2.png" class="img-component">
    <img src="img/components-6-3.png" class="img-component">
    <img src="img/components-6-4.png" class="img-component">
    <img src="img/components-6-5.png" class="img-component">
    <img src="img/components-6-6.png" class="img-component">
    <img src="img/components-6-7.png" class="img-component">
    <img src="img/components-7-0.png" class="img-component">
    <img src="img/components-7-1.png" class="img-component">
    <img src="img/components-7-2.png" class="img-component">
    <img src="img/components-7-3.png" class="img-component">
    <img src="img/components-7-4.png" class="img-component">
    <img src="img/components-7-5.png" class="img-component">
    <img src="img/components-7-6.png" class="img-component">
    <img src="img/components-7-7.png" class="img-component">
</div>

Εάν τραβήξουμε τις εικόνες, προσαρμόσουμε την αντίθεσή τους στη σωστή ποσότητα και στη συνέχεια τις προσθέσουμε, μπορούμε να δημιουργήσουμε οποιαδήποτε εικόνα.

Ας ξεκινήσουμε με αυτό το γράμμα «Α». Είναι αρκετά μικρό, αλλά χρειαζόμαστε να είναι μικρό, διαφορετικά θα καταλήξουμε με πάρα πολλές άλλες εικόνες.

<img src="img/a.png" class="sketch sketch-letter">

Καθώς προσθέτουμε όλο και περισσότερες από αυτές τις εικόνες, καταλήγουμε σε κάτι που γίνεται όλο και πιο κοντά στην πραγματική εικόνα. Αλλά νομίζω ότι θα δείτε το μοτίβο εδώ, καθώς έχουμε μια λογική προσέγγιση με μερικά μόνο από αυτά.

<div class="hidden-preload">
    <img src="img/img-buildup-0-0.png">
    <img src="img/img-buildup-0-1.png">
    <img src="img/img-buildup-0-2.png">
    <img src="img/img-buildup-0-3.png">
    <img src="img/img-buildup-0-4.png">
    <img src="img/img-buildup-0-5.png">
    <img src="img/img-buildup-0-6.png">
    <img src="img/img-buildup-0-7.png">
    <img src="img/img-buildup-1-0.png">
    <img src="img/img-buildup-1-1.png">
    <img src="img/img-buildup-1-2.png">
    <img src="img/img-buildup-1-3.png">
    <img src="img/img-buildup-1-4.png">
    <img src="img/img-buildup-1-5.png">
    <img src="img/img-buildup-1-6.png">
    <img src="img/img-buildup-1-7.png">
    <img src="img/img-buildup-2-0.png">
    <img src="img/img-buildup-2-1.png">
    <img src="img/img-buildup-2-2.png">
    <img src="img/img-buildup-2-3.png">
    <img src="img/img-buildup-2-4.png">
    <img src="img/img-buildup-2-5.png">
    <img src="img/img-buildup-2-6.png">
    <img src="img/img-buildup-2-7.png">
    <img src="img/img-buildup-3-0.png">
    <img src="img/img-buildup-3-1.png">
    <img src="img/img-buildup-3-2.png">
    <img src="img/img-buildup-3-3.png">
    <img src="img/img-buildup-3-4.png">
    <img src="img/img-buildup-3-5.png">
    <img src="img/img-buildup-3-6.png">
    <img src="img/img-buildup-3-7.png">
    <img src="img/img-buildup-4-0.png">
    <img src="img/img-buildup-4-1.png">
    <img src="img/img-buildup-4-2.png">
    <img src="img/img-buildup-4-3.png">
    <img src="img/img-buildup-4-4.png">
    <img src="img/img-buildup-4-5.png">
    <img src="img/img-buildup-4-6.png">
    <img src="img/img-buildup-4-7.png">
    <img src="img/img-buildup-5-0.png">
    <img src="img/img-buildup-5-1.png">
    <img src="img/img-buildup-5-2.png">
    <img src="img/img-buildup-5-3.png">
    <img src="img/img-buildup-5-4.png">
    <img src="img/img-buildup-5-5.png">
    <img src="img/img-buildup-5-6.png">
    <img src="img/img-buildup-5-7.png">
    <img src="img/img-buildup-6-0.png">
    <img src="img/img-buildup-6-1.png">
    <img src="img/img-buildup-6-2.png">
    <img src="img/img-buildup-6-3.png">
    <img src="img/img-buildup-6-4.png">
    <img src="img/img-buildup-6-5.png">
    <img src="img/img-buildup-6-6.png">
    <img src="img/img-buildup-6-7.png">
    <img src="img/img-buildup-7-0.png">
    <img src="img/img-buildup-7-1.png">
    <img src="img/img-buildup-7-2.png">
    <img src="img/img-buildup-7-3.png">
    <img src="img/img-buildup-7-4.png">
    <img src="img/img-buildup-7-5.png">
    <img src="img/img-buildup-7-6.png">
    <img src="img/img-buildup-7-7.png">
</div>
<div id="letter-buildup" class="multi-container">
<img id="letter-buildup-letter" src="img/img-buildup-0-0.png" class="sketch sketch-letter">
<div id="letter-buildup-components" class="img-component-container">
    <img src="img/img-components-0-0.png" class="img-component">
    <img src="img/img-components-0-1.png" class="img-component">
    <img src="img/img-components-0-2.png" class="img-component">
    <img src="img/img-components-0-3.png" class="img-component">
    <img src="img/img-components-0-4.png" class="img-component">
    <img src="img/img-components-0-5.png" class="img-component">
    <img src="img/img-components-0-6.png" class="img-component">
    <img src="img/img-components-0-7.png" class="img-component">
    <img src="img/img-components-1-0.png" class="img-component">
    <img src="img/img-components-1-1.png" class="img-component">
    <img src="img/img-components-1-2.png" class="img-component">
    <img src="img/img-components-1-3.png" class="img-component">
    <img src="img/img-components-1-4.png" class="img-component">
    <img src="img/img-components-1-5.png" class="img-component">
    <img src="img/img-components-1-6.png" class="img-component">
    <img src="img/img-components-1-7.png" class="img-component">
    <img src="img/img-components-2-0.png" class="img-component">
    <img src="img/img-components-2-1.png" class="img-component">
    <img src="img/img-components-2-2.png" class="img-component">
    <img src="img/img-components-2-3.png" class="img-component">
    <img src="img/img-components-2-4.png" class="img-component">
    <img src="img/img-components-2-5.png" class="img-component">
    <img src="img/img-components-2-6.png" class="img-component">
    <img src="img/img-components-2-7.png" class="img-component">
    <img src="img/img-components-3-0.png" class="img-component">
    <img src="img/img-components-3-1.png" class="img-component">
    <img src="img/img-components-3-2.png" class="img-component">
    <img src="img/img-components-3-3.png" class="img-component">
    <img src="img/img-components-3-4.png" class="img-component">
    <img src="img/img-components-3-5.png" class="img-component">
    <img src="img/img-components-3-6.png" class="img-component">
    <img src="img/img-components-3-7.png" class="img-component">
    <img src="img/img-components-4-0.png" class="img-component">
    <img src="img/img-components-4-1.png" class="img-component">
    <img src="img/img-components-4-2.png" class="img-component">
    <img src="img/img-components-4-3.png" class="img-component">
    <img src="img/img-components-4-4.png" class="img-component">
    <img src="img/img-components-4-5.png" class="img-component">
    <img src="img/img-components-4-6.png" class="img-component">
    <img src="img/img-components-4-7.png" class="img-component">
    <img src="img/img-components-5-0.png" class="img-component">
    <img src="img/img-components-5-1.png" class="img-component">
    <img src="img/img-components-5-2.png" class="img-component">
    <img src="img/img-components-5-3.png" class="img-component">
    <img src="img/img-components-5-4.png" class="img-component">
    <img src="img/img-components-5-5.png" class="img-component">
    <img src="img/img-components-5-6.png" class="img-component">
    <img src="img/img-components-5-7.png" class="img-component">
    <img src="img/img-components-6-0.png" class="img-component">
    <img src="img/img-components-6-1.png" class="img-component">
    <img src="img/img-components-6-2.png" class="img-component">
    <img src="img/img-components-6-3.png" class="img-component">
    <img src="img/img-components-6-4.png" class="img-component">
    <img src="img/img-components-6-5.png" class="img-component">
    <img src="img/img-components-6-6.png" class="img-component">
    <img src="img/img-components-6-7.png" class="img-component">
    <img src="img/img-components-7-0.png" class="img-component">
    <img src="img/img-components-7-1.png" class="img-component">
    <img src="img/img-components-7-2.png" class="img-component">
    <img src="img/img-components-7-3.png" class="img-component">
    <img src="img/img-components-7-4.png" class="img-component">
    <img src="img/img-components-7-5.png" class="img-component">
    <img src="img/img-components-7-6.png" class="img-component">
    <img src="img/img-components-7-7.png" class="img-component">
</div>
</div>

Για πραγματικές εικόνες JPEG υπάρχουν μόνο μερικές επιπλέον λεπτομέρειες.

Η εικόνα χωρίζεται σε κομμάτια 8x8 και κάθε κομμάτι χωρίζεται χωριστά. Χρησιμοποιούμε ένα σύνολο συχνοτήτων για να προσδιορίσουμε πόσο ανοιχτό ή σκούρο είναι κάθε pixel και, στη συνέχεια, άλλα δύο σετ για το χρώμα, ένα για το κόκκινο-πράσινο και ένα άλλο για το μπλε-κίτρινο. Ο αριθμός των συχνοτήτων που χρησιμοποιούμε για κάθε κομμάτι καθορίζει την ποιότητα του JPEG.

Εδώ είναι μια πραγματική εικόνα JPEG, μεγεθύνεται ώστε να μπορούμε να δούμε τις λεπτομέρειες. Όταν παίζουμε με τα ποιοτικά 

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## Συμπέρασμα

Ας ανακεφαλαιώσουμε λοιπόν:

- Οι μετασχηματισμοί Fourier είναι πράγματα που μας επιτρέπουν να πάρουμε κάτι και να το χωρίσουμε στις συχνότητές του.
- Οι συχνότητες μας λένε για κάποιες θεμελιώδεις ιδιότητες των δεδομένων που έχουμε
- Και μπορεί να συμπιέσει δεδομένα αποθηκεύοντας μόνο τις σημαντικές συχνότητες
- Και μπορούμε επίσης να τα χρησιμοποιήσουμε για να φτιάξουμε όμορφες κινούμενες εικόνες με ένα σωρό κύκλους

Αυτό απλώς ξύνει την επιφάνεια σε ορισμένες εφαρμογές. Ο μετασχηματισμός Fourier είναι ένα εξαιρετικά ισχυρό εργαλείο, επειδή ο διαχωρισμός των πραγμάτων σε συχνότητες είναι τόσο θεμελιώδης. Χρησιμοποιούνται σε πολλά πεδία, συμπεριλαμβανομένου του σχεδιασμού κυκλωμάτων, των σημάτων κινητών τηλεφώνων, της απεικόνισης μαγνητικού συντονισμού (MRI) και της κβαντικής φυσικής!
## Ερωτήσεις για τους περίεργους

Παρέλειψα τα περισσότερα από τα μαθηματικά εδώ, αλλά αν σας ενδιαφέρουν οι βασικές αρχές του τρόπου λειτουργίας τους, ακολουθούν ορισμένες ερωτήσεις που μπορείτε να χρησιμοποιήσετε για να καθοδηγήσετε την έρευνά σας:

- Πώς αντιπροσωπεύετε μαθηματικά έναν μετασχηματισμό Fourier;
- Ποια είναι η διαφορά μεταξύ ενός μετασχηματισμού Fourier συνεχούς χρόνου και ενός μετασχηματισμού Fourier διακριτού χρόνου;
- Πώς πραγματοποιείτε υπολογιστικά έναν μετασχηματισμό Fourier;
- Πώς κάνεις μια μεταμόρφωση Fourier ενός ολόκληρου τραγουδιού; (Αντί απλώς μια σημείωση.)

## Περαιτέρω ανάγνωση

Για να μάθετε περισσότερα, μερικοί πολύ καλοί πόροι που μπορείτε να ελέγξετε είναι:


[Ένας διαδραστικός οδηγός για τον μετασχηματισμό Fourier](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)
Ένα υπέροχο άρθρο που σκάβει περισσότερο στα μαθηματικά του τι συμβαίνει.

[Τι είναι όμως ο Μετασχηματισμός Fourier; Μια οπτική εισαγωγή.](https://www.youtube.com/watch?v=spUNpyF58BY)
Ένα υπέροχο βίντεο στο Youtube από το 3Blue1Brown, που εξηγεί επίσης τα μαθηματικά των μεταμορφώσεων Fourier από την οπτική γωνία του ήχου.

[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)
Ένα άλλο άρθρο που εξηγεί πώς μπορείτε να χρησιμοποιήσετε επικύκλους για να σχεδιάσετε μια διαδρομή, εξηγείται από μια προοπτική γραμμικής άλγεβρας.

[Μετασχηματισμός Fourier (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)
Και φυσικά, το άρθρο της Wikipedia είναι επίσης πολύ καλό.

## Ο συγγραφέας

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

Είμαι ο Jez! Εργάζομαι με πλήρες ωράριο σε μια [εταιρία αναζήτησης](https://www.google.com/) στην Bay Area και στον ελεύθερο χρόνο μου αρέσει να φτιάχνω παιχνίδια και διαδραστικούς κωδικούς όπως αυτό!

Αυτή η ιστοσελίδα είναι ανοιχτού κώδικα, μπορείτε να δείτε τον κώδικα στο [GitHub](https://github.com/Jezzamonn/fourier)! Εάν έχετε σχόλια ή θέλετε να κάνετε ερωτήσεις, μη διστάσετε να μου στείλετε email στο <span id="email-text">fourier [at] jezzamon [dot] com</span> ή να μου στείλετε ένα tweet στο [Twitter ](https://twitter.com/jezzamonn).

Αν θέλετε να δείτε περισσότερα από τη δουλειά μου, ρίξτε μια ματιά στην [αρχική σελίδα](/) μου και αν θέλετε να δείτε τι κάνω στη συνέχεια, μπορείτε να ακολουθήσετε τον λογαριασμό μου στο Twitter, [@jezzamonn](https://twitter .com/jezzamonn)!

