<?php
include "bdd.class.php";
include "discussion.class.php";
include "message.class.php";
//var_dump($_GET, $_POST);

/**
 * On vérifie que l'URL contienne l'action à effectuer.
 * en fonction de cette action, le code diffère
 * Toutes les données retournées sont encodées en JSON de façon à pouvoir être interprétées et manipulées par le JS
 */
if(array_key_exists("action", $_GET)){
    $action = $_GET["action"];
    switch($action){
        case "getDiscussionName":
            /**
             * Récupère le nom d'une discussion en fonction de son ID
             */
            if(array_key_exists("id", $_POST)){
                $id = trim($_POST["id"]);
                $discussion = new Discussion();
                $result = $discussion->getName($id);
                echo json_encode(["discussion" => $result["Name"]]);
            }
            break;
        case "create":
            /**
             * Crée une nouvelle discussion
             * Passe le nom de la discussion en majuscule et s'il contient des espaces, les remplace par un "-"
             */
            if(array_key_exists("id", $_POST)){
                die('ya id mec');
                $id = trim($_POST["id"]);
                $id = strtoupper(str_replace(" ", "-", $id));
                $discussion = new Discussion();
                $result = $discussion->create($id);
                echo json_encode(["discussion" => $result]);
            }
            break;
        case "join":
            /**
             * Vérifie qu'une discussion existe
             * Si elle existe, retourne son id, sinon retourne false
             */
            if(array_key_exists("id", $_POST)){
                $id = trim($_POST["id"]);
                $id = strtoupper(str_replace(" ", "-", $id));
                $discussion = new Discussion();
                $result = $discussion->exists($id);
                if($result){
                    $result = $discussion->getId($id);
                    $result = $result["Id"];
                } 
                echo json_encode(["discussion" => $result]);
            }
            break;
        case "addMessage":
            /**
             * Ajoute un message à une discussion
             */
            if(array_key_exists("id", $_POST) && array_key_exists("msg", $_POST) && array_key_exists("pseudo", $_POST)){
                $id = trim($_POST["id"]);
                $msg = trim($_POST["msg"]);
                $pseudo = trim($_POST["pseudo"]);
                $message = new Message();
                $result = $message->add($id, $msg, $pseudo);
                echo json_encode(["message" => $result]);
            }
            break;
        case "getMessages":
            /**
             * Récupère tous les messages d'une discussion
             * Evolution possible : ne récupérer qu'un certain nombre de messages et créer un scroll infini dans l'interface
             */
            if(array_key_exists("id", $_POST)){
                $id = trim($_POST["id"]);
                $message = new Message();
                $result = $message->get($id);
                echo json_encode($result);
            }
            break;
        case "getLastMessages":
            /**
             * Récupère les derniers messages arrivés après l'ID d'un message renseigné
             */
            if(array_key_exists("id", $_POST) && array_key_exists("lastId", $_POST)){
                $id = trim($_POST["id"]);
                $last = trim($_POST["lastId"]);
                $message = new Message();
                $result = $message->get($id, $last);
                echo json_encode($result);
            }
            break;
    }
}
