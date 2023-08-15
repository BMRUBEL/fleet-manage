<?php
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;

class Parts extends CI_Controller
{
    public function __construct() {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('Parts_model');
    }

    public function get_parts()
    {
        $data=$this->Parts_model->list();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
    }

    public function getVehicles()
    {
        $data=$this->Parts_model->vecList();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
    }

    public function get_stock_out()
    {
        $data=$this->Parts_model->get_stock_out();
        $this->output->set_content_type('application/json')->set_output(json_encode(['stock_out'=>$data,'status'=>true]));
    }

    public function get_stock()
    {
        $data=$this->Parts_model->get_stock();
        $this->output->set_content_type('application/json')->set_output(json_encode(['stock'=>$data,'status'=>true]));
    }

    public function add_stock_out()
    {
        $data=json_decode(file_get_contents("php://input"),true);
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            $d=$this->Parts_model->save_stock($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Inserted!','status'=>true]));
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

    public function deleteparts()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Parts_model->deleteparts($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully deleted!','status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

    public function editparts()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Parts_model->editparts($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['parts'=>$d,'status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

    public function updatestockout()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $this->Parts_model->updatestockout($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Updated!','status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

    public function stockDetails()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=[];
            if($data['startDate']!=''){
                $std=date_create($data['startDate']);
                $etd=date_create($data['endDate']);
                $int=new DateInterval('P1D');
                $rang=new DatePeriod($std,$int,$etd);
                foreach($rang as $r){
                    $d[]=$this->Parts_model->get_stk($data['id'],$r->format('Y-m-d'));
                }
            }else{
                $std=date_create(date('Y-m'.'-01'));
                $etd=date_create(date('Y-m-d'));
                $int=new DateInterval('P1D');
                $rang=new DatePeriod($std,$int,$etd);
                foreach($rang as $r){
                    $d[]=$this->Parts_model->get_stk($data['id'],$r->format('Y-m-d'));
                }

              
                
            }

            $this->output->set_content_type('application/json')->set_output(json_encode(['stockdetails'=>$d,'status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }
    // public function test()
    // {
    //     $d=$this->Parts_model->test();
    //     echo "<pre>";
    //     print_r($d);
    // }

    public function availableCar()
    {
        $data=$this->Parts_model->availableCar();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
    }

    public function carTrack()
    {
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Parts_model->trackCar($data['registration_no']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['track'=>$d,'status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }
} 