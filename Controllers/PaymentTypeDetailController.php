<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../Conexion.php';

// Create PaymentTypeDetail
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $idPaymentDetail = $data->idPaymentDetail;
    $idPaymentType = $data->idPaymentType;
    $amount = $data->amount;

    $sql = "INSERT INTO PaymentTypeDetail (idPaymentDetail, idPaymentType, amount) VALUES (:idPaymentDetail, :idPaymentType, :amount)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPaymentDetail", $idPaymentDetail);
    $stmt->bindParam(":idPaymentType", $idPaymentType);
    $stmt->bindParam(":amount", $amount);

    if ($stmt->execute()) {
        echo json_encode(["message" => "PaymentTypeDetail created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create PaymentTypeDetail"]);
    }
}

// Get all PaymentTypeDetails
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM PaymentTypeDetail";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $paymentTypeDetails = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($paymentTypeDetails);
}

// Update PaymentTypeDetail
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    $idPaymentTypeDetail = $data->idPaymentTypeDetail;
    $idPaymentDetail = $data->idPaymentDetail;
    $idPaymentType = $data->idPaymentType;
    $amount = $data->amount;

    $sql = "UPDATE PaymentTypeDetail SET idPaymentDetail = :idPaymentDetail, idPaymentType = :idPaymentType, amount = :amount WHERE idPaymentTypeDetail = :idPaymentTypeDetail";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idPaymentTypeDetail", $idPaymentTypeDetail);
    $stmt->bindParam(":idPaymentDetail", $idPaymentDetail);
    $stmt->bindParam(":idPaymentType", $idPaymentType);
    $stmt->bindParam(":amount", $amount);

    if ($stmt->execute()) {
        echo json_encode(["message" => "PaymentTypeDetail updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update PaymentTypeDetail"]);
    }
}

// Delete PaymentTypeDetail
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $idPaymentTypeDetail = $_GET['idPaymentTypeDetail'] ?? null;

    if ($idPaymentTypeDetail !== null) {
        $sql = "DELETE FROM PaymentTypeDetail WHERE idPaymentTypeDetail = :idPaymentTypeDetail";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":idPaymentTypeDetail", $idPaymentTypeDetail);

        if ($stmt->execute()) {
            echo json_encode(["message" => "PaymentTypeDetail deleted successfully"]);
        } else {
            echo json_encode(["message" => "Failed to delete PaymentTypeDetail"]);
        }
    } else {
        echo json_encode(["message" => "Invalid request. Missing idPaymentTypeDetail parameter in the URL"]);
    }
}
?>
