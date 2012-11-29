#ifndef CDBLIB_H
#define CDBLIB_H

#include <node.h>
#include <v8.h>
#include <cstdio>
#include <cdb.h>

class CDBLib : public node::ObjectWrap {
	public:
		static void Init(v8::Handle<v8::Object> target);

	private:
		CDBLib();
		~CDBLib();

	static v8::Handle<v8::Value> New(const v8::Arguments& args);
	static v8::Handle<v8::Value> get(const v8::Arguments& args);
	static v8::Handle<v8::Value> close(const v8::Arguments& args);
	char filename[256];
	struct cdb context;
	FILE * filehandler;
};

#endif
