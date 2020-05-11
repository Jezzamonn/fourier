התמרות פורייה הן כלי שניתן להשתמש בו בתחומים רבים. כאן יינתן הסבר על מה שהתמרת פורייה עושה, ועל דרכים שונות שאפשר להשתמש בה. כמו על איך מכינים דברים יפים בעזרתה, כמו למשל הדבר הזה:

<canvas id="self-draw" class="sketch" width=500 height=500></canvas>

אני הולך להסביר איך האנימציה הזאת עובדת, ותוך כדי אסביר את התמרת פורייה!

בסוף היום אתם אמורים להכיר:
- מה התמרת פורייה עושה
- שימושים פרקטיים של התמרות פורייה
- שימושים חסרי משמעות (אבל מגניבים) של התמרות פורייה

נכון לעכשיו, אנחנו הולכים לעזוב את המתמטיקה ואת המשוואות. אמנם יש הרבה מתמטיקה מעניינת מאחורי הנושא הזה, אבל עדיף להתחיל עם מה שזה עושה בפועל, ועם הסיבות להשתמש בזה; אם אתם רוצים לדעת יותר על איך מבצעים התמרת פורייה, יש בהמשך קישורים לקריאה ולהרחבה!

## אז מה זה הדבר הזה?

אם נפשט את הדברים, התמרת פורייה היא דרך לפצל משהו לכמה גלים בצורת סינוס. כרגיל, השם מגיע מאיזה איש שחי לפני זמן רב שקראו לו פורייה.

אז בואו ונתחיל עם כמה דוגמאות פשוטות, ונתקדם בהדרגה. דבר ראשון אנחנו הולכים להתבונן בגלים - דפוסים החוזרים על עצמם בזמן.

הנה גל לדוגמה:

<canvas id="combo-sine-wave" class="sketch" width=500 height=300></canvas>

הדפוס הגלי הזה יכול להתפצל לגלי סינוס. וכן על זה הדרך, כאשר נחבר את שני גלי הסינוס נקבל את הגל המקורי.

<canvas id="combo-sine-wave-split" class="sketch" width=500 height=500></canvas>

התמרת פורייה היא דרך עבורנו לקחת את הגל המחובר, ולקבל ממנו את גלי הסינוס שמרכיבים אותו בחזרה. בדוגמה הזאת, אתם יכולים כמעט לבצע את זה בראש, רק על ידי הסתכלות על הגל המקורי.

למה זה? מסתבר שדברים רבים בעולם האמיתי פועלים בהתבסס על גלי סינוס. אנו בדרך כלל קוראים להם תדרי הגל.

הדוגמה הברורה ביותר היא הקול - כאשר אנו שומעים קול, איננו שומעים את הקו המפותל הזה, אלא אנו שומעים את התדרים של גלי הסינוס שמרכיבים את הקול.

<button id="together-button" class="button">נגן את הגל המלא</button>

<button id="split-button-1" class="button">נגן תדר גבוה</button>

<button id="split-button-2" class="button">נגן תדר נמוך</button>

המסוגלות לפצל אותם בעזרת מחשב יכולה לעזור לנו להבין מה בן אדם שומע בפועל. אנו יכולים להבין כמה גבוה או נמוך הקול, או להבין איזה תו מתנגן.

אנו יכולים להשתמש בתהליך הזה גם כדי לנתח גלים שלא נראים כאילו הם מורכבים מגלי סינוס.

בואו נתבונן בטיפוס הזה. הוא נקרא גל מרובע.

<canvas id="square-wave" class="sketch" width=500 height=300></canvas>

אולי זה לא נראה כך, אבל גם אותו ניתן לפצל לכמה גלי סינוס.

<canvas id="square-wave-split" class="sketch" width=500 height=500></canvas>

הפעם אנו צריכים הרבה גלי סינוס - למעשה אנו צריכים כמות אינסופית בכדי לייצג אותו באמת. ככל שנחבר עוד ועוד גלי סינוס, צורת הגל תהיה קרובה יותר ויותר אל הגל המרובע שאיתו התחלנו.

<canvas id="square-wave-build-up" class="sketch" width=500 height=500></canvas>
<input id="square-wave-build-up-slider" type="range" min="0" max="1" value="0" step="any" >

<button id="square-wave-button" class="button">נגן גל</button>

*הזיזו את המחוון שלמעלה בכדי לקבוע כמה גלי סינוס יהיו*

בהסתכלות בלבד, תבחינו שלמעשה רק גלי הסינוס הראשונים הם אלה שיוצרים את ההבדל הגדול. כאשר המחוון נמצא באמצע הסקלה, יש לנו כבר את הצורה הכללית של הגל, אבל היא מפותלת מאוד. אנו זקוקים כעת רק לשאר הגלים הקטנים כדי לגרום לפיתול להתיישר.

כאשר תאזינו לגל, אתם תשמעו שהקול נעשה נמוך, מפני שהסרנו את התדרים הגבוהים.

התהליך הזה  עובד כך עבור כל קו שחוזר על עצמו. נסו את זה, ציירו דפוס משלכם!

<div class="multi-container">
<div class="sketch" >
    <canvas id="wave-draw" class="sketch-child" width=500 height=300></canvas>
    <p id="wave-draw-instruction" class="instruction wave-instruction">ציירו כאן!</p>
</div>
<canvas id="wave-draw-split" class="sketch" width=500 height=500></canvas>
</div>
<input id="wave-draw-slider" type="range" min="0" max="1" value="1" step="any">
<button id="wave-draw-button" class="button">נגן גל</button>

*הזיזו את המחוון כדי לראות איך תוספת של עוד גלי סינוס, גורמת לציור המוצג להיות קרוב יותר ויותר לצורה המקורית שלכם*

גם כאן, מלבד תוספת הפיתול, הגל נראה די דומה אפילו שהוא מורכב רק מחצי כמות גלי הסינוס.

עצם העובדה שהגל נראה דומה, יכולה לשמש לנו כיתרון. ע"י שימוש בהתמרת פורייה, אנו יכולים לקבל את החלקים החשובים של קול, ולאחסן רק את אלו שקרובים מאוד לקול המקורי.

בדרך כלל, אחסון גל במחשב מתבצע כאחסון של סדרת נקודות.

<canvas id="wave-samples" class="sketch" width=500 height=500></canvas>

מה שאפשר לעשות במקום זה, הוא לייצג את הגל על-ידי כמה גלי סינוס. לאחר מכן, אנו יכולים לצמצם את נפח האחסון שלו ע"י התעלמות מהתדרים הנמוכים. התוצאה הסופית שנקבל אמנם לא תהיה זהה לגל שהכנסנו, אבל עדיין הקול המעובד יישמע די דומה למאזין שמקשיב לו.

<canvas id="wave-frequencies" class="sketch" width=500 height=500></canvas>

זאת למעשה דרך הפעולה של שמירת קול בקבצי MP3, אם כי הם יותר מתוחכמים בבחירת התדירויות שהם בוחרים להסיר או להשאיר.

אז במקרה זה, אנו יכולים להשתמש בהתמרות פורייה בכדי לקבל מושג על התכונות היסודיות של גל, ולאחר מכן להשתמש בהבנה הזאת כדי, למשל, לכווץ קבצים.

או-קיי, בואו נעמיק יותר לתוך התמרת פורייה. החלק הבא נראה די מגניב, וגם נותן לנו מעט יותר הבנה על מה שהתמרת פורייה עושה. אבל הרוב נראה מגניב.

## אפיציקלים

בהתחלה אמרנו שהתמרת פורייה מפצלת דברים לגלי סינוס. העניין הוא, שגלי הסינוס שהיא יוצרת הם לא סתם גלים רגילים, אלא גלים תלת מימדיים. נוכל לקרוא להם "סינוסים מרוכבים" או בפשטות "ספירלות".

<canvas id="complex-sinusoid" class="sketch" width=500 height=500></canvas>

אם נתבונן מהצד, הם יראו לנו כמו גלי סינוס. אבל מבט מקדימה יחשוף פרופיל של מעגלים.

<canvas id="complex-sinusoid-turn" class="sketch" width=500 height=500></canvas>

עד עכשיו כל מה שעשינו דרש רק את כלי הסינוס הדו-מימדיים והרגילים. כשאנו מבצעים התמרת פורייה על גלים דו-מימדיים, החלקים המרוכבים מתבטלים כך שלמעשה נשארים בידנו גלי סינוס רגילים.

אך אנו יכולים להשתמש בגלים התלת מימדיים כדי להכין משהו כיפי שנראה כך:

<canvas id="peace-epicycles" class="sketch" width=500 height=500></canvas>

מה הולך פה?

ובכן, אפשר לחשוב על הציור כעל צורה תלת מימדית, בשל האופן בו הוא משתנה במשך הזמן. אם נדמיין שבנאדם מצייר את היד הזאת באמצעות עיפרון ודף, אזי שלושת המימדים מייצגים את מיקום חוד העיפרון בכל רגע נתון. מימדי x ו- y, מספרים לנו על מיקום חוד העיפרון על הדף, ומימד הזמן מציין לנו את הזמן באותו הרגע.

<canvas id="peace-3d" class="sketch" width=500 height=500></canvas>

כעת, כשיש בידנו דפוס תלת מימדי, איננו יכולים עוד להשתמש בגלי הסינוס הדו-מימדיים כדי לייצג אותו.לא משנה כמה גלים דו-מימדיים נצרף האחד אל השני, לעולם לא נקבל משהו תלת מימדי כתוצאה מכך. אם כן, עלינו לחפש דרך אחרת לייצוג.

אנו יכולים להשתמש בספירלות הסינוס התלת מימדיות שדנו בהן קודם כדי לייצג באופן תלת מימדי. אם נצרף הרבה ספירלות זו לזו, נוכל לקבל משהו  שנראה כמו הדפוס התלת מימדי שלנו.

עלינו לזכור, הגלים הללו נראים כמו מעגלים, כאשר מסתכלים עליהם בפרופיל קדמי. השם של תבנית של מעגל שנע מסביב למעגל אחר הוא אפיציקל.

<canvas id="peace-build-up" class="sketch" width=500 height=500></canvas>
<input id="peace-build-up-slider" type="range" min="0" max="1" value="1" step="any">

*השתמש במחוון לעיל כדי לשלוט בכמות המעגלים הקיימים.*

כמו מקודם, אנו מקבלים קירוב די טוב עבור הדפוס שלנו בעזרת מעגלים בודדים. ומאחר והדפוס הוא צורה די פשוטה, כל המעגלים האחרונים שנוסיף רק יחדדו מעט את הקצוות של הצורה. 

כל זה תקף לכל ציור שהוא, באמת! עכשיו תורכם לשחק עם זה.

<div class="multi-container">
<div class="sketch" >
    <canvas id="draw-zone" class="sketch-child" width=500 height=500></canvas>
    <p id="draw-zone-instruction" class="instruction">צייר כאן!</p>
    <button id="draw-zone-undo-button" class="button embedded-button">לבטל</button>
</div>
<canvas id="circle-zone" class="sketch" width=500 height=500></canvas>
</div>
<input id="circle-zone-slider" type="range" min="0" max="1" value="1" step="any">

*השתמשו במחוון כדי לשלוט בכמות המעגלים בה תשתמשו כדי לצייר*

שוב, אתם תראו שאת רוב הצורות אנו יכולים להעריך באופן די טוב, באמצעות מספר קטן של מעגלים בלבד, במקום לשמור את כל הנקודות שמחברות את הצורה.

האם ניתן להשתמש בזה עבור נתונים אמיתיים? ובכן, אנו יכולים! במציאות יש לנו פורמט נתונים נוסף שנקרא SVG, שככל הנראה עושה עבודה טובה יותר בעיבוד סוגי הצורות שאנו מציירים. אז לעת עתה, כל מה שאמרנו זה רק כדי להכין גיפים (gifs) קטנים ומגניבים. 

<canvas id="fourier-title" class="sketch" width=500 height=300></canvas>

בכל מקרה, ישנו סוג נוסף של פורמט נתונים חזותיים שעושה שימוש בהתמרות פורייה.

## JPEGs

האם ידעתם שהתמרות פורייה יכולות להיות שימושיות גם בתמונות? למעשה, אנו משתמשים בזה כל הזמן, מפני שכך פורמט JPEG עובד! אנו מיישמים את אותם העקרונות עבור תמונות - מפצלים משהו אל כמה גלי סינוס, ורק אז מאחסנים אותם, אבל רק את אלה החשובים.

כעת כשאנו באים להתעסק עם תמונות, אנו זקוקים לסוג שונה של גל סינוס. אנו זקוקים לסוג סינוס כזה שלא משנה איזו תמונה תהיה ברשותנו, עדיין נוכל לצרף כמה מגלי הסינוס הללו כדי לקבל בחזרה את התמונה המקורית.

כדי לעשות את זה, כל אחד מגלי הסינוס יהיו תמונות בעצמם. במקום גל שהוא קו, יש לנו כעת תמונה עם איזורים שחורים ולבנים. כדי לייצג את הגודל של גל, לכל תמונה תהיה ניגודיות (קונטרסט) גבוהה או נמוכה יותר.

אנו יכולים להשתמש בשיטה הזאת כדי לייצג צבע, אבל לעת עתה נתחיל עם תמונות בשחור ולבן. בכדי לייצג תמונות חסרות צבע, אנו צריכים כמה תמונות גל אופקיות,

<img id="img-y-component" src="img/components-4-0.png" class="sketch sketch-small">

בצירוף כמה תמונות גל אנכיות.

<img id="img-x-component" src="img/components-0-4.png" class="sketch sketch-small">

תמונות גל אופקיות ואנכיות לא יכולות לייצג בעצמם את סוגי התמונות שאנו מקבלים. אנו זקוקים גם לתמונות נוספות , אותן נקבל על ידי הכפלה של שני סוגי התמונות זה בזה.

<div class="multi-container">
<img id="img-mult-x-component" src="img/components-0-4.png" class="sketch sketch-mult">
<div class="maths">×</div>
<img id="img-mult-y-component" src="img/components-4-0.png" class="sketch sketch-mult">
<div class="maths">=</div>
<img id="img-x-y-component" src="img/components-4-4.png" class="sketch sketch-mult">
</div>

כדי לשחזר תמונה של 8X8, אלו הן כל התמונות להן אנו זקוקים.

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

אם ניקח את התמונות, נתאים את הניגודיות שלהן לכמות הנכונה, ואז נחבר אותן ביחד, אנו יכולים ליצור כל תמונה.

ניקח לדוגמה את האות 'A'. אמנם היא קצת קטנה, אבל אנחנו רוצים שהיא תהיה קטנה, אחרת נצטרך הרבה יותר תמונות כדי לשחזר אותה.

<img src="img/a.png" class="sketch sketch-letter">

ככל שנוסיף עוד ועוד מהתמונות הללו, בסופו של דבר נקבל איזה משהו שנראה קרוב יותר ויותר אל התמונה המקורית. אבל נדמה לי שתבחינו כאן בדפוס, כאשר נקבל קירוב סביר באמצעות רק כמה מהן.

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

עבור תמונת JPEG אמיתית ישנם רק עוד כמה פרטים נוספים.

התמונה מחולקת ל"חתיכות" של 8X8, וכל חתיכה עוברת תהליך פיצול נפרד. אנו משתמשים בסט אחד של תדירויות כדי לקבוע כמה בהיר או כהה כל פיקסל יהיה, ובנוסף עוד שני סטים של תדירויות עבור הצבע, סט עבור אדום-ירוק, וסט עבור כחול-צהוב. מספר התדירויות בהן נשתמש בכל "חתיכה" יקבע את איכות תמונת ה- JPEG המתקבלת.

הנה תמונת JPEG אמיתית, ומוגדלת כדי שנוכל להבחין בפרטים. כאשר נשחק ברמות האיכות נוכל לראות את התהליך הזה קורה.

<div id="jpeg-example" class="sketch">
    <img src="img/cat.png" class="sketch-child clear-pixels">
</div>

## סיכום

אז, מה היה לנו?

- התמרת פוריה היא כלי שמאפשר לנו לקחת משהו ולפצל אותו לתדירויות שלו.
- התדירויות מספרות לנו על כמה מהתכונות היסודיות של המידע שנמצא ברשותנו.
- אנו יכולים לדחוס נתונים באמצעות אחסון של תדירויות חשובות בלבד.
- ואנו יכולים להשתמש בהתמרות פורייה כדי ליצור אנימציות מגניבות עם חבורה של מעגלים. 

זוהי רק הקדמה לפתיחת המבוא של יישומי התמרת פוריה. התמרת פורייה היא כלי חזק במיוחד, מפני שפיצול דברים לתדירויות הוא כל כך יסודי. משתמשים בהן בתחומים רבים, כולל תכנון מעגלים אלקטרוניים, אותות סלולריים, דימות תהודה מגנטית (MRI), ופיזיקה קוונטית!

## שאלות לסקרנים

דילגתי כאן על רוב המתמטיקה, אבל אם אתם מעוניינים בעקרונות הבסיסיים של אופן הפעולה של התמרות פורייה, הנה כמה שאלות שיכולות להנחות את המחקר שלכם: 

- איך אפשר לייצג באופן מתמטי התמרת פוריה?
- מה ההבדל בין התמרת פורייה רציפה בזמן לבין התמרת פורייה בדידה?
- איך אפשר לבצע המתרת פורייה באופן חישובי?
- איך מבצעים חישוב של התמרת פורייה?
- איך ניתן לבצע התמרת פורייה של שיר שלם? (להבדיל מצליל בודד)

## לקריאה נוספת

אם תרצו להעמיק עוד בנושא, הנה רשימת מקורות טובים שתוכלו לבדוק:

[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)  
מאמר מעולה שמעמיק יותר לתוך המתמטיקה של מה שקורה.

[But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY)  
סרטון וידאו נהדר של 3Blue1Brown, שמסביר בנוסף את המתמטיקה של התמרות פורייה מפרספקטיבה של אודיו.


[A Tale of Math & Art: Creating the Fourier Series Harmonic Circles Visualization](https://alex.miller.im/posts/fourier-series-spinning-circles-visualization/)  
מאמר נוסף שמסביר איך ניתן להשתמש באפיציקלים כדי לצייר מסלול, מוסבר מפרספקטיבה של אלגברה לינארית.

[Fourier transform (Wikipedia)](https://en.wikipedia.org/wiki/Fourier_transform)  
וכמובן, המאמר בוויקיפדיה הוא גם די טוב.

## המחבר

<canvas id="its-meee" class="sketch" width=500 height=500></canvas>

שמי ג'אז! אני עובד במשרה מלאה ב[חברת חיפוש](https://www.google.com/) באיזור המפרץ של סן-פרנסיסקו, ובזמני הפנוי אני אוהב להכין משחקים וקודים אינטראקטיביים כמו זה!

האתר הזה הוא קוד-פתוח, אתם יכולים להתרשם מהקוד ב- [GitHub](https://github.com/Jezzamonn/fourier)! אם יש לכם איזה משוב או שתרצו לשאול שאלות כלשהן, תרגישו חופשי לשלוח לי אימייל לכתובת <span id="email-text">fourier [at] jezzamon [dot] com</span>, או לצייץ לי ב[טוויטר](https://twitter.com/jezzamonn).

אם אתם רוצים לראות עוד עבודות שלי, אתם יכולים לבקר ב[דף הבית שלי](/), ואם תרצו לראות מה הדבר הבא שאני מכין, אתם יכולים לעקוב אחרי חשבון הטוויטר שלי, [@jezzamonn](https://twitter.com/jezzamonn)!