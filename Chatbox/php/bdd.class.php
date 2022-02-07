<?php

class BDD {
    private $bdd;

    public function __construct (){
        //'mysql:host=127.0.0.1;dbname=chatbox;charset=UTF8;port:8080'
        $this->bdd = new PDO (
            'mysql:host=db;dbname=chatbox;charset=UTF8;',
            'root',
            'password',
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]
            );
    }

    /**
     * Requête faisant un fetch simple
     * attend à minima la requête SQL
     */
    public function selectOne(string $sql, array $param = []){
        $requete = $this->bdd->prepare($sql);
        $requete->execute($param);
        return $requete->fetch();
    }

    /**
     * Requête faisant un fetchall
     */
    public function selectAll(string $sql, array $param = []){
        $requete = $this->bdd->prepare($sql);
        $requete->execute($param);
        return $requete->fetchAll();
    }

    /**
     * execute la requete et renvoie le resultat
     * true si la requête s'est bien exécutée
     * false s'il y a eu un problème 
     */
    public function execute(string $sql, array $param = []){
        $requete = $this->bdd->prepare($sql);
        return $requete->execute($param);
    }
    
    /**
     * renvoie le dernier ID inséré dans la base
     */
    public function getLastId(){
        return $this->bdd->lastInsertId();
    }

}