<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../Conexion.php';

// Create a supplier transaction
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $idPurchase = $data->idPurchase;
    $transactionDate = $data->transactionDate;
    $amount = $data->amount;
    $status = $data->status;

    $sql = "INSERT INTO SupplierTransaction (idPurchase, transactionDate, amount, status) VALUES (:idPurchase, :transactionDate, :amount, :status)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPurchase", $idPurchase);
    $stmt->bindParam(":transactionDate", $transactionDate);
    $stmt->bindParam(":amount", $amount);
    $stmt->bindParam(":status", $status);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Supplier transaction created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create supplier transaction"]);
    }
}

// Get all supplier transactions
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM SupplierTransaction";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($transactions);
}

// Update a supplier transaction
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    $idSupplierTransaction = $data->idSupplierTransaction;
    $idPurchase = $data->idPurchase;
    $transactionDate = $data->transactionDate;
    $amount = $data->amount;
    $status = $data->status;

    $sql = "UPDATE SupplierTransaction SET idPurchase = :idPurchase, transactionDate = :transactionDate, amount = :amount, status = :status WHERE idSupplierTransaction = :idSupplierTransaction";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idSupplierTransaction", $idSupplierTransaction);
    $stmt->bindParam(":idPurchase", $idPurchase);
    $stmt->bindParam(":transactionDate", $transactionDate);
    $stmt->bindParam(":amount", $amount);
    $stmt->bindParam(":status", $status);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Supplier transaction updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update supplier transaction"]);
    }
}

// Delete a supplier transaction
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $idSupplierTransaction = $_GET['idSupplierTransaction'] ?? null;

    if ($idSupplierTransaction !== null) {
        $sql = "DELETE FROM SupplierTransaction WHERE idSupplierTransaction = :idSupplierTransaction";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":idSupplierTransaction", $idSupplierTransaction);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Supplier transaction deleted successfully"]);
        } else {
            echo json_encode(["message" => "Failed to delete supplier transaction"]);
        }
    } else {
        echo json_encode(["message" => "Invalid request. Missing idSupplierTransaction parameter in the URL"]);
    }
}
?>
