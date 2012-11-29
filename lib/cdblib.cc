#define BUILDING_NODE_EXTENSION
#include <node.h>
#include <v8.h>
#include "cdblib.h"
#include <cstdio>
#include <string.h>
#include <cdb.h>
#include <errno.h>
//#include <iostream> //DEBUG

using namespace v8;
//using namespace std; //DEBUG
//cout << "hi"

CDBLib::CDBLib() {};
CDBLib::~CDBLib() {};

void CDBLib::Init(Handle<Object> target) {
	// Prepare constructor template
	Local<FunctionTemplate> tpl = FunctionTemplate::New(New);
	tpl->SetClassName(String::NewSymbol("CDBLib"));
	// Prototype
	tpl->InstanceTemplate()->SetInternalFieldCount(1);
	tpl->PrototypeTemplate()->Set(String::NewSymbol("get"), FunctionTemplate::New(get)->GetFunction());
	tpl->PrototypeTemplate()->Set(String::NewSymbol("close"), FunctionTemplate::New(close)->GetFunction());

	Persistent<Function> constructor = Persistent<Function>::New(tpl->GetFunction());
	target->Set(String::NewSymbol("CDBLib"), constructor);
}

Handle<Value> CDBLib::New(const Arguments& args) {
	HandleScope scope;

	CDBLib* obj = new CDBLib();
	
	if (args.Length() < 1) {
		ThrowException(Exception::TypeError(String::New("Missing cdb filename")));
		return scope.Close(Undefined());
	}
	
	// Open a file handler to the cdb file
	String::Utf8Value utf8_value(args[0]);

	strcpy(obj->filename,*utf8_value);
	obj->filehandler = fopen(obj->filename,"r");

	if(obj->filehandler == NULL) {
		ThrowException(Exception::TypeError(String::New(strerror(errno))));
		return scope.Close(Undefined());
	}

	// Allocate contect to hold information about the cdb
	if (cdb_init(&obj->context, fileno(obj->filehandler)) == -1) {
		ThrowException(Exception::TypeError(String::New("CDB malformed in cdb_init")));
	}

	obj->Wrap(args.This());

	return args.This();
}

Handle<Value> CDBLib::get(const Arguments& args) {
	HandleScope scope;

	CDBLib* obj = ObjectWrap::Unwrap<CDBLib>(args.This());

	if (args.Length() < 1) {
		ThrowException(Exception::TypeError(String::New("Missing key")));
		return scope.Close(Undefined());
	}

	String::Utf8Value utf8_value(args[0]);

	if (cdb_find(&obj->context, *utf8_value, strlen(*utf8_value)) == -1) {
		ThrowException(Exception::TypeError(String::New("CDB malformed in cdb_find")));
	}

	int row_pos = cdb_datapos(&obj->context);
	int row_len = cdb_datalen(&obj->context);

	char * row = new char [row_len+1];

	
	if(cdb_read(&obj->context, row, row_len, row_pos) == -1) {
		ThrowException(Exception::TypeError(String::New("CDB malformed in cdb_read")));
		return scope.Close(Undefined());
	}

	row[row_len] = '\0';

	return scope.Close(String::New(row));
}

Handle<Value> CDBLib::close(const Arguments& args) {
	HandleScope scope;

	CDBLib* obj = ObjectWrap::Unwrap<CDBLib>(args.This());

	cdb_free(&obj->context);
	fclose(obj->filehandler);

	return scope.Close(String::New("1"));
}
