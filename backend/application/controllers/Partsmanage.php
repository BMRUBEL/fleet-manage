<?php
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\Key;
class Partsmanage extends CI_Controller
{
    public function __construct() {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        $this->load->model('Partsmanage_model');
    }
    public function index()
    {
        $data=$this->Partsmanage_model->parts_list();
        $this->output->set_content_type('application/json')->set_output(json_encode(['parts_list'=>$data,'status'=>true]));
    }
    public function add_parts()
    {
        $data=json_decode(file_get_contents("php://input"),true);
        // $data['password']=md5($data['password']);
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            $d=$this->Partsmanage_model->save_parts($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully Inserted!','status'=>true]));
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

    public function edit_parts()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Partsmanage_model->edit_parts($data['id']);
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
    public function update_parts()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $this->Partsmanage_model->update_parts($data);
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>'Successfully updated!','status'=>true]));
            // Your section ends here
        }catch(ExpiredException $e){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$e->getMessage(),'status'=>false]));
        }catch(SignatureInvalidException $s){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$s->getMessage(),'status'=>false]));
        }catch(Exception $ex){
            $this->output->set_content_type('application/json')->set_output(json_encode(['msg'=>$ex->getMessage(),'status'=>false]));
        }
    }

    public function delete_parts()
    {
        
        $header = apache_request_headers();
        $token=$header['Authorization'];
        try{
            $decoded=JWT::decode($token,new Key($this->config->item('encryption_key'),'HS256'));
            // Your section starts here
            $data=json_decode(file_get_contents("php://input"),true);
            $d=$this->Partsmanage_model->delete_parts($data['id']);
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
}
