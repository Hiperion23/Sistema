<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../Conexion.php';

// Create a purchase
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $idSupplier = $data->idSupplier;
    $purchaseDate = $data->purchaseDate;
    $totalAmount = $data->totalAmount;
    $status = $data->status;

    $sql = "INSERT INTO purchase (idSupplier, purchaseDate, totalAmount, status) VALUES (:idSupplier, :purchaseDate, :totalAmount, :status)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idSupplier", $idSupplier);
    $stmt->bindParam(":purchaseDate", $purchaseDate);
    $stmt->bindParam(":totalAmount", $totalAmount);
    $stmt->bindParam(":status", $status);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Purchase created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create purchase"]);
    }
}

// Get all purchases
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM purchase";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $purchases = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($purchases);
}

// Update a purchase
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    $idPurchase = $data->idPurchase;
    $idSupplier = $data->idSupplier;
    $purchaseDate = $data->purchaseDate;
    $totalAmount = $data->totalAmount;
    $status = $data->status;

    $sql = "UPDATE purchase SET idSupplier = :idSupplier, purchaseDate = :purchaseDate, totalAmount = :totalAmount, status = :status WHERE idPurchase = :idPurchase";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPurchase", $idPurchase);
    $stmt->bindParam(":idSupplier", $idSupplier);
    $stmt->bindParam(":purchaseDate", $purchaseDate);
    $stmt->bindParam(":totalAmount", $totalAmount);
    $stmt->bindParam(":status", $status);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Purchase updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update purchase"]);
    }
}

// Delete a purchase
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));
    $idPurchase = $data->idPurchase;

    $sql = "DELETE FROM purchase WHERE idPurchase = :idPurchase";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPurchase", $idPurchase);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Purchase deleted successfully"]);
    } else {
        echo json_encode(["message" => "Failed to delete purchase"]);
    }
}
?>
