<?php

class Message {
    private $bdd;

    public function __construct (){
        $this->bdd = new BDD();
    }

    /**
     * Ajoute un message dans la BDD
     */
    public function add($id, $msg, $pseudo){
        $requete = "INSERT INTO message(Contenu, Pseudo, Id_Discussion) VALUES(?, ?, ?)";
        $result = $this->bdd->execute($requete, [$msg, $pseudo, $id]);
        if ($result) $result = $this->bdd->getLastId();
        return $result;
    }

    /**
     * Récupère une liste de messages
     * Par défaut, tous les messages d'une conversation
     * Si le 2eme paramètre est renseigné, alors elle le récupère que les messages étant arrivé après le dernier dont l'ID est passé en paramètre
     */
    public function get($idDiscussion, $lastIdMsg = false){
        $requete = "SELECT * FROM message WHERE Id_Discussion = :idDiscussion";
        if ($lastIdMsg != false) {
            $requete .= " AND id > :lasId";
            $param[":lasId"] = $lastIdMsg;
        }
        $requete .= " ORDER BY Tempo";
        $param[":idDiscussion"] = $idDiscussion;
        return $this->bdd->selectAll($requete, $param);
    }
}