<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../Conexion.php';

// Create PaymentDetail
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $idPayment = $data->idPayment;
    $document = $data->document;
    $documentNumber = $data->documentNumber;
    $paymentAmount = $data->paymentAmount;
    $paymentDate = $data->paymentDate;

    $sql = "INSERT INTO PaymentDetail (idPayment, document, documentNumber, paymentAmount, paymentDate) VALUES (:idPayment, :document, :documentNumber, :paymentAmount, :paymentDate)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPayment", $idPayment);
    $stmt->bindParam(":document", $document);
    $stmt->bindParam(":documentNumber", $documentNumber);
    $stmt->bindParam(":paymentAmount", $paymentAmount);
    $stmt->bindParam(":paymentDate", $paymentDate);

    if ($stmt->execute()) {
        echo json_encode(["message" => "PaymentDetail created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create PaymentDetail"]);
    }
}

// Get all PaymentDetails
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM PaymentDetail";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $paymentDetails = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($paymentDetails);
}

// Update PaymentDetail
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    $idPaymentDetail = $data->idPaymentDetail;
    $idPayment = $data->idPayment;
    $document = $data->document;
    $documentNumber = $data->documentNumber;
    $paymentAmount = $data->paymentAmount;
    $paymentDate = $data->paymentDate;

    $sql = "UPDATE PaymentDetail SET idPayment = :idPayment, document = :document, documentNumber = :documentNumber, paymentAmount = :paymentAmount, paymentDate = :paymentDate WHERE idPaymentDetail = :idPaymentDetail";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPaymentDetail", $idPaymentDetail);
    $stmt->bindParam(":idPayment", $idPayment);
    $stmt->bindParam(":document", $document);
    $stmt->bindParam(":documentNumber", $documentNumber);
    $stmt->bindParam(":paymentAmount", $paymentAmount);
    $stmt->bindParam(":paymentDate", $paymentDate);

    if ($stmt->execute()) {
        echo json_encode(["message" => "PaymentDetail updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update PaymentDetail"]);
    }
}

// Delete PaymentDetail
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $idPaymentDetail = $_GET['idPaymentDetail'] ?? null;

    if ($idPaymentDetail !== null) {
        $sql = "DELETE FROM PaymentDetail WHERE idPaymentDetail = :idPaymentDetail";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":idPaymentDetail", $idPaymentDetail);

        if ($stmt->execute()) {
            echo json_encode(["message" => "PaymentDetail deleted successfully"]);
        } else {
            echo json_encode(["message" => "Failed to delete PaymentDetail"]);
        }
    } else {
        echo json_encode(["message" => "Invalid request. Missing idPaymentDetail parameter in the URL"]);
    }
}
?>
