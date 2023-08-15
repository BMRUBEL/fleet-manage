<?php
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;

class Partsin extends CI_Controller
{
    public function __construct() {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('Partsin_model');
    }

    public function get_parts()
    {
        $data=$this->Partsin_model->list();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
    }

    public function get_partsName()
    {
        $data=$this->Partsin_model->partName();
        $this->output->set_content_type('application/json')->set_output(json_encode(['Namelist'=>$data,'status'=>true]));
    }

    public function get_stock_list()
    {
        $data=$this->Partsin_model->stock_list();
        $this->output->set_content_type('application/json')->set_output(json_encode(['list'=>$data,'status'=>true]));
    }

    public function get_stock_in()
    {
        $data=json_decode(file_get_contents("php://input"),true);
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            $d=$this->Partsin_model->save_stock($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Inserted!','status'=>true]));
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

    public function editGet_stock()
    {
        $data=json_decode(file_get_contents("php://input"), true);
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            $d=$this->Partsin_model->getOne_stock($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['parts_data'=>$d,'status'=>true]));
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }
    public function update_stock_in()
    {
        // var_dump($data);
        $data=json_decode(file_get_contents("php://input"), true);
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            $d=$this->Partsin_model->update_stock_in($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Updated!','status'=>true]));
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }


    public function deleteGet_stock_in()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Partsin_model->delete_stock($data['id']);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Deleted!','status'=>true]));
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

} 