<?php

class Discussion {
    private $bdd;

    public function __construct (){
        $this->bdd = new BDD();
    }

    //vérifie qu'une discussion existe déjà dans la BDD
    public function exists($name){
        $requete = "SELECT Id FROM discussion WHERE Name=?";
        $discuss = $this->bdd->selectAll($requete, [$name]);
        if(count($discuss) > 0){
            $result = true;
        } else {
            $result = false;
        }
        return $result;
    }

    //crée une discussion
    public function create($name){
        if($this->exists($name)) return false;
        $requete = "INSERT INTO discussion(Name) VALUES(?)";
        $result = $this->bdd->execute($requete, [$name]);
        if ($result) $result = $this->bdd->getLastId();
        return $result;
    }

    //récupère l'ID d'une discussion à partir de son name
    public function getId($name){
        $requete = "SELECT Id FROM discussion WHERE Name=?";
        $result = $this->bdd->selectOne($requete, [$name]);
        return $result;
    }

    //récupère le nom d'une discussion à partir de son ID
    public function getName($id){
        $requete = "SELECT Name FROM discussion WHERE Id=?";
        $result = $this->bdd->selectOne($requete, [$id]);
        return $result;
    }

}