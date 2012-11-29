#define BUILDING_NODE_EXTENSION
#include <node.h>
#include <v8.h>
#include "cdblib.h"

using namespace v8;

void InitAll(Handle<Object> target) {
	CDBLib::Init(target);
}

NODE_MODULE(cdblib, InitAll)
