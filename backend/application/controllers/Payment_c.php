<?php

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;

class Payment_c extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('Payment_model');
        // $this->load->model('IncomeExpense_model');
    }

    public function VehicleName()
    {

        $data = $this->Payment_model->getVehi();
        $this->output->set_content_type('application/json')->set_output(json_encode(['vehicl' => $data, 'status' => true]));
    }



    public function pmntGet()
    {

        $data = $this->Payment_model->getPmnts();
        $this->output->set_content_type('application/json')->set_output(json_encode(['pmnts' => $data, 'status' => true]));
    }

    public function getPerId()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here

            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Payment_model->getPerIdm($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['income_expense' => $d, 'status' => true]));

            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }

    public function editPmnt()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Payment_model->pmntEdit($data['id'], $data['vehicle_id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['sgPmnt' => $d, 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }


    public function deletPmnt()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here

            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Payment_model->pmntDelete($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully deleted!', 'status' => true]));

            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }

    public function saveVehi()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here

            $data = json_decode(file_get_contents("php://input"), true);
            $this->Payment_model->setVehi($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully Inserted!', 'status' => true]));

            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }

    public function saveUpdate()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here

            $data = json_decode(file_get_contents("php://input"), true);
            $this->Payment_model->updateVehi($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => 'Successfully Updated!', 'status' => true]));

            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }


    // public function SrcVehicle_Report()
    // {

    //     $header = apache_request_headers();
    //     $token = $header['Authorization'];
    //     try {
    //         $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
    //         // Your section starts here

    //         $data = json_decode(file_get_contents("php://input"), true);
    //         $d = $this->Payment_model->getVehicle_Report($data['id']);
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['income_expense' => $d, 'status' => true]));

    //         // Your section ends here
    //     } catch (ExpiredException $e) {
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
    //     } catch (SignatureInvalidException $s) {
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
    //     } catch (Exception $ex) {
    //         $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
    //     }
    // }
}
