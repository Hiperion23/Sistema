<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../Conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM InstallmentPurchase";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $installments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($installments);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    // Extract data from JSON
    $idPurchase = $data->idPurchase;
    $installmentNumber = $data->installmentNumber;
    $installmentAmount = $data->installmentAmount;
    $dueDate = $data->dueDate;
    $status = $data->status;

    $sql = "INSERT INTO InstallmentPurchase (idPurchase, installmentNumber, installmentAmount, dueDate, status) VALUES (:idPurchase, :installmentNumber, :installmentAmount, :dueDate, :status)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPurchase", $idPurchase);
    $stmt->bindParam(":installmentNumber", $installmentNumber);
    $stmt->bindParam(":installmentAmount", $installmentAmount);
    $stmt->bindParam(":dueDate", $dueDate);
    $stmt->bindParam(":status", $status);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Installment created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create installment"]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    // Extract data from JSON
    $idInstallmentPurchase = $data->idInstallmentPurchase;
    $idPurchase = $data->idPurchase;
    $installmentNumber = $data->installmentNumber;
    $installmentAmount = $data->installmentAmount;
    $dueDate = $data->dueDate;
    $status = $data->status;

    $sql = "UPDATE InstallmentPurchase SET idPurchase = :idPurchase, installmentNumber = :installmentNumber, installmentAmount = :installmentAmount, dueDate = :dueDate, status = :status WHERE idInstallmentPurchase = :idInstallmentPurchase";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idInstallmentPurchase", $idInstallmentPurchase);
    $stmt->bindParam(":idPurchase", $idPurchase);
    $stmt->bindParam(":installmentNumber", $installmentNumber);
    $stmt->bindParam(":installmentAmount", $installmentAmount);
    $stmt->bindParam(":dueDate", $dueDate);
    $stmt->bindParam(":status", $status);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Installment updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update installment"]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $idInstallmentPurchase = $_GET['idInstallmentPurchase'] ?? null;

    if ($idInstallmentPurchase !== null) {
        $sql = "DELETE FROM InstallmentPurchase WHERE idInstallmentPurchase = :idInstallmentPurchase";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":idInstallmentPurchase", $idInstallmentPurchase);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Installment deleted successfully"]);
        } else {
            echo json_encode(["message" => "Failed to delete installment"]);
        }
    } else {
        echo json_encode(["message" => "Invalid request. Missing idInstallmentPurchase parameter in the URL"]);
    }
}
?>
