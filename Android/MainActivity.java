package com.example.black.bankautobahn;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;



/*
    Le court programme qui permet a l'pplication de fonctionner
    Le fichier des permission n'est pas fournit car très peut intéréssant a voir
    D'autre petit fichier comme colors.xml ou strings.xml ne seront pas fournit car
    ils ne servent pas a grand chose
 */

public class MainActivity extends AppCompatActivity {
    WebView myWebView;


    //On suavegarde la page actuelle pour éviter par exemple au changement d'orientation de se retrouver sur la page d'accueil
    @Override
    protected void onSaveInstanceState(Bundle outState )
    {
        super.onSaveInstanceState(outState);
        myWebView.saveState(outState);
    }

    //On restaure la page sauvegarder plus haut
    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState)
    {
        super.onRestoreInstanceState(savedInstanceState);
        myWebView.restoreState(savedInstanceState);
    }

    //Si on appuis sur le bouton retous du téléphone on reviens sur la page précédante
    @Override
    public void onBackPressed() {
        if (myWebView.canGoBack()) {
            myWebView.goBack();
        }

    }

    /*Équivalent de la fonction main
        On créer l'application et on définit l'afffichage de main.xml
        le main.xml n'est pas fournit car il correspond juste à
        j'ai une web view qui prend tout mon écran.
    */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);




        //On définit la vue sur le site (page d'accueil).
        myWebView = findViewById(R.id.webview);
        myWebView.setWebViewClient(new WebViewClient());
        if (savedInstanceState == null) {
            myWebView.loadUrl("https://bank.filipski.fr/");
        }

        //On active les fonction du javascript
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

    }
}
