<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
 

    <!-- Meta SEO Tags -->
    <meta name="description" content="Portfolio van Amin Darouiche met kunst en foto's. Bekijk mijn kunstwerken en neem contact op voor samenwerkingen.">
    <meta name="keywords" content="kunst, portfolio, tekeningen, fotografie, artist, Nederland">
    <meta name="author" content="Amin Darouiche">

    <!-- Title of the page -->
    <title>Mijn Portfolio</title>

    <!-- Favicon -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- External Font Link (Google Fonts) -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">

    <!-- Link to External CSS File -->
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>

    <style>
        /* Base Style */
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f4f4f4, #ffcccc); /* Dégradé d'arrière-plan */
            color: #333;
            scroll-behavior: smooth; /* Smooth scrolling */
        }

        /* Header Style */
        header {
            background-color: #333;
            color: white;
            padding: 15px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        header h1 {
            margin: 0;
            font-size: 2.5em;
        }

        /* Navigation Menu Style */
        nav {
            background-color: #444;
            text-align: center;
            padding: 5px;
        }

        nav a {
            color: white;
            margin: 0 10px;
            text-decoration: none;
            font-size: 1.2em;
            transition: color 0.3s ease;
        }

        nav a:hover {
            color: #ff6f61;
        }

        /* Home Section Style */
        .home {
            padding: 40px 20px;
            text-align: center;
            background-color: rgba(255, 255, 255, 0.9); /* Couleur de fond avec opacité */
            border-bottom: 1px solid #ddd;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .home h2 {
            font-size: 2.5em;
            color: #333;
            margin-bottom: 10px;
        }

        .home p {
            font-size: 1.2em;
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .home a {
            display: inline-block;
            padding: 12px 24px;
            background-color: #ff6f61;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .home a:hover {
            background-color: #ff4c3b;
        }

        /* Gallery Section Style */
        .gallery {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 20px 0;
        }

        .gallery img {
            margin: 10px;
            width: 300px;
            height: 200px;
            object-fit: cover;
            border-radius: 5px;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .gallery img:hover {
            transform: scale(1.05);
            opacity: 0.8;
        }

        /* Footer Style */
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 15px;
            position: relative;
        }

        footer p {
            margin: 0;
        }

        /* Modal Style */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1000; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
        }

        .modal-content {
            margin: auto;
            display: block;
            width: 80%; /* Width of the image */
            max-width: 700px; /* Max width of the image */
        }

        .close {
            position: absolute;
            top: 15px;
            right: 35px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s ease;
        }

        .close:hover {
            color: #ff6f61; /* Change color on hover */
        }

        /* Responsive Style for Mobiles and Tablets */
        @media (max-width: 768px) {
            nav a {
                font-size: 1em;
                margin: 0 5px;
            }

            .home h2 {
                font-size: 2em;
            }

            .home p {
                font-size: 1em;
            }

            .gallery img {
                width: 100%;
                height: auto;
            }
        }
    </style>
       <meta name="google-site-verification" content="EqwBPGDgncWNW7W5gouPif08ZY4FcHfurNx5yLE5lBg" />
</head>
<body>

    <!-- Header Section -->
    <header>
        <h1>Mijn Portfolio</h1>
    </header>

    <!-- Navigation Menu -->
    <nav>
        <a href="about.html">Over mij</a>
        <a href="services.html">Diensten</a>
        <a href="gallery.html">Galerij</a>
        <a href="testimonials.html">Getuigenissen</a>
        <a href="contact.html">Contact</a>
    </nav>
    
    <!-- Main Content -->
    <main>
        <!-- Home Section -->
        <section class="home" id="home">
            <h2>Welkom op mijn portfolio!</h2>
            <p>Ik ben Amin Darouiche, een gepassioneerde kunstenaar die zijn creativiteit deelt door middel van fotografie en tekenen. Neem een kijkje in mijn werk en ontdek mijn artistieke wereld.</p>
            <a href="gallery.html">Bekijk mijn werk</a>
        </section>

        <!-- Gallery Section -->
        <section class="gallery">
            <h2>Een Glimp van Mijn Werk</h2>
            <img src="images/IMG_0635.jpg" alt="Een prachtige tekening van een landschap">
            <img src="images/29F48534-1F79-402D-94AE-3746D5A34EAB.JPG" alt="Abstracte kunstwerk met levendige kleuren">
            <img src="images/8FCBF767-BFB6-473A-80E2-D6DED4C062A6.JPG" alt="Fotografie van een stedelijk landschap">
        </section>
    </main>

                            
    <!-- Modal for Image Display -->
    <div class="modal" id="imageModal">
        <span class="close" aria-label="Close">&times;</span>
        <img class="modal-content" src="image.jpg" alt="Description of image">
    </div>

    <!-- Footer Section -->
    <footer>
        <p>&copy; 2024 Amin Darouiche. Alle rechten voorbehouden.</p>
    </footer>
    <section class="testimonials">
        <h2>Laissez un témoignage</h2>
    
        <!-- Formulaire de soumission de témoignage -->
        <form action="testimonials.php" method="post">
            <label for="name">Votre nom :</label>
            <input type="text" id="name" name="name" required>
    
            <label for="message">Votre témoignage :</label>
            <textarea id="message" name="message" rows="4" required></textarea>
    
            <button type="submit">Envoyer</button>
        </form>
    
        <div class="comment-section">
            <h3>Témoignages des utilisateurs :</h3>
            <!-- Les commentaires seront affichés ici -->
            <div id="testimonial-list">
                <!-- Les commentaires seront insérés ici depuis la base de données -->
            </div>
        </div>
    </section>
    <a href="google55bbaf91c86f970e.html"></a>
</body>
</html>
