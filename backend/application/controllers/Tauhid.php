<?php
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;

class Tauhid extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('Tauhid_model');
    }
    public function addbooking()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            
            // $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // $vehicleid = $data['vehicle_id'];
            // $startdate = $data['start_date'];
            // if (condition) {
            //     # code...
            // } else {
            //     $d = $this->Tauhid_model->savebooking($data);
            //     $this->output->set_content_type('application/json')->set_output(json_encode(['status' => true]));
            // }

            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            $d = $this->Tauhid_model->savebooking($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['status' => true]));
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    public function getCustomer()
    {
        $data = $this->Tauhid_model->getCustomer();
        $this->output->set_content_type('application/json')->set_output(json_encode(['customer' => $data, 'status' => true]));
    }

    public function getVehicle()
    {
        $data = $this->Tauhid_model->getVehicle();
        $this->output->set_content_type('application/json')->set_output(json_encode(['vehicle' => $data, 'status' => true]));
    }

    public function getDriver()
    {
        $data = $this->Tauhid_model->getDriver();
        $this->output->set_content_type('application/json')->set_output(json_encode(['driver' => $data, 'status' => true]));
    }

    public function getBooking()
    {
        $data = $this->Tauhid_model->getBooking();
        $this->output->set_content_type('application/json')->set_output(json_encode(['booking' => $data, 'status' => true]));
    }

    public function getExistingBookings()
    {
        $data = $this->Tauhid_model->getExistingBookings();
        $this->output->set_content_type('application/json')->set_output(json_encode(['booking' => $data, 'status' => true]));
    }

    public function deletebooking()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Tauhid_model->deletebooking($data['id']);
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
    public function editbooking()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $d = $this->Tauhid_model->editbooking($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['booking' => $d, 'status' => true]));
            // Your section ends here
        } catch (ExpiredException $e) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $e->getMessage(), 'status' => false]));
        } catch (SignatureInvalidException $s) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $s->getMessage(), 'status' => false]));
        } catch (Exception $ex) {
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg' => $ex->getMessage(), 'status' => false]));
        }
    }
    public function updatebooking()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $this->Tauhid_model->updatebooking($data);
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
    public function bookingreport()
    {

        $header = apache_request_headers();
        $token = $header['Authorization'];
        try {
            $decoded = JWT::decode($token, new Key($this->config->item('encryption_key'), 'HS256'));
            // Your section starts here
            $data = json_decode(file_get_contents("php://input"), true);
            $d = [];
            if ($data['startDate'] != '') {
                $std = date_create($data['startDate']);
                $etd = date_create($data['endDate']);
                $int = new DateInterval('P1D');
                $rang = new DatePeriod($std, $int, $etd);
                foreach ($rang as $r) {
                    $d[] = $this->Tauhid_model->getbookingreport($r->format('Y-m-d'));
                }
            } else {
                $std = date_create(date('Y-m' . '-01'));
                $etd = date_create(date('Y-m-d'));
                $int = new DateInterval('P1D');
                $rang = new DatePeriod($std, $int, $etd);
                foreach ($rang as $r) {
                    $d[] = $this->Tauhid_model->getbookingreport($r->format('Y-m-d'));
                }



            }

            $this->output->set_content_type('application/json')->set_output(json_encode(['bookDetails' => $d, 'status' => true]));
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


?>