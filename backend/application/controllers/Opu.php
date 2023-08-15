<?php
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;

class Opu extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('Opu_model');
    }
    public function getDriver()
    {
        $data = $this->Opu_model->getDriver();
        $this->output->set_content_type('application/json')->set_output(json_encode(['driver' => $data, 'status' => true]));
    }
    public function adddriverpayment()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        // $data['password'] = md5($data['password']);
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            $d = $this->Opu_model->savedriverpayment($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['status' => true]));
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    public function getPayment()
    {
        $data=$this->Opu_model->getPayment();
        $this->output->set_content_type('application/json')->set_output(json_encode(['payment' => $data, 'status' => true]));
        // var_dump($data);
    }
    public function deletepayment()
    {
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Opu_model->delete_payment($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    public function editpayment()
    {
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Opu_model->edit_payment($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['payment' => $d, 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    public function updatepayment()
    {
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $this->Opu_model->update_payment($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
}
