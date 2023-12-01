<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once '../Conexion.php';

// Create a supplier
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $name = $data->name;
    $address = $data->address;
    $phone = $data->phone;
    $email = $data->email;

    $sql = "INSERT INTO supplier (name, address, phone, email) VALUES (:name, :address, :phone, :email)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":address", $address);
    $stmt->bindParam(":phone", $phone);
    $stmt->bindParam(":email", $email);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Supplier created successfully"]);
    } else {
        echo json_encode(["message" => "Failed to create supplier"]);
    }
}

// Get all suppliers
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM supplier";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $suppliers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($suppliers);
}

// Update a supplier
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));

    $idSupplier = $data->idSupplier;
    $name = $data->name;
    $address = $data->address;
    $phone = $data->phone;
    $email = $data->email;

    $sql = "UPDATE supplier SET name = :name, address = :address, phone = :phone, email = :email WHERE idSupplier = :idSupplier";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":idSupplier", $idSupplier);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":address", $address);
    $stmt->bindParam(":phone", $phone);
    $stmt->bindParam(":email", $email);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Supplier updated successfully"]);
    } else {
        echo json_encode(["message" => "Failed to update supplier"]);
    }
}

// Delete a supplier
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $idSupplier = $_GET['idSupplier'] ?? null;

    if ($idSupplier !== null){
        $sql = "DELETE FROM supplier WHERE idSupplier = :idSupplier";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":idSupplier", $idSupplier);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Supplier deleted successfully"]);
        } else {
            echo json_encode(["message" => "Failed to delete supplier"]);
        }    
    } else {
        echo json_encode(["message" => "Invalid request. Missing idSupplier parameter in the URL"]);
    }
}
?>
