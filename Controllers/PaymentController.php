<?php
require_once '../Conexion.php';

// Create a payment
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $idPurchase = $data->idPurchase;
    $paymentAmount = $data->paymentAmount;
    $paymentDate = $data->paymentDate;
    $status = $data->status;

    $sql = "INSERT INTO payment (idPurchase, paymentAmount, paymentDate, status) VALUES (:idPurchase, :paymentAmount, :paymentDate, :status)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPurchase", $idPurchase);
    $stmt->bindParam(":paymentAmount", $paymentAmount);
    $stmt->bindParam(":paymentDate", $paymentDate);
    $stmt->bindParam(":status", $status);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Payment created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create payment"]);
    }
}

// Get all payments
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM payment";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($payments);
    exit;
}

// Update a payment
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    $idPayment = $data->idPayment;
    $idPurchase = $data->idPurchase;
    $paymentAmount = $data->paymentAmount;
    $paymentDate = $data->paymentDate;
    $status = $data->status;

    $sql = "UPDATE payment SET idPurchase = :idPurchase, paymentAmount = :paymentAmount, paymentDate = :paymentDate, status = :status WHERE idPayment = :idPayment";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPayment", $idPayment);
    $stmt->bindParam(":idPurchase", $idPurchase);
    $stmt->bindParam(":paymentAmount", $paymentAmount);
    $stmt->bindParam(":paymentDate", $paymentDate);
    $stmt->bindParam(":status", $status);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Payment updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update payment"]);
    }
}

// Delete a payment
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));
    $idPayment = $data->idPayment;

    $sql = "DELETE FROM payment WHERE idPayment = :idPayment";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPayment", $idPayment);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Payment deleted successfully"]);
    } else {
        echo json_encode(["message" => "Failed to delete payment"]);
    }
}
?>
