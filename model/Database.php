<?php
class Database
{
    protected $connection = null;
    
    public function __construct()
    {
        try {
            // Cambia los valores de las constantes según tus configuraciones de base de datos
            $this->connection = new mysqli("localhost", "root", "", "sistema");
            
            if (mysqli_connect_errno()) {
                throw new Exception("Could not connect to the database.");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function select($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement($query, $params);
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return false;
    }

    private function executeStatement($query = "", $params = [])
    {
        try {
            $stmt = $this->connection->prepare($query);
            if ($stmt === false) {
                throw new Exception("Unable to prepare statement: " . $query);
            }
            if ($params) {
                $this->bindParams($stmt, $params);
            }
            $stmt->execute();
            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    private function bindParams($stmt, $params)
    {
        $paramTypes = $params[0];
        $paramValues = array_slice($params, 1);

        // Use call_user_func_array para pasar los parámetros como referencia
        call_user_func_array(array($stmt, 'bind_param'), array_merge([$paramTypes], $paramValues));
    }
}
