#include <iostream>
using namespace std;

class LinkedList {
public:
  // Constructor
  LinkedList() {
    head = tail = NULL;
    count = 0;
  }
  ~LinkedList();
  bool isEmpty() { return count == 0; }
  void insert(int num);
  void append(int num);
  int popHead();
  int peek() { return head->data; }
  void display();
private:
  struct Node {
    int data;
    Node* next;
  };
  typedef Node* NodePtr;
  NodePtr head, tail;
  int count;
};

LinkedList::~LinkedList() {
  while (head) {
    popHead();
  }
}

void LinkedList::insert(int num) {
  NodePtr node = new Node;
  node->data = num;
  node->next = head;
  head = node;
  if (tail == NULL)
    tail = node;
  count++;
}

int LinkedList::popHead() {
  NodePtr victim = head;
  head = head->next;
  int num = victim->data;
  delete victim;
  count--;
  if (count == 0)
    tail = NULL;
  return num;
}

void LinkedList::append(int num) {
  NodePtr node = new Node;
  node->data = num;
  node->next = NULL;
  if (tail)
    tail->next = node;
  // First element?
  if (head == NULL)
    // Point head to new node
    head = node;
  // Second element?
  if (count == 1)
    // Point head->next to new node
    head->next = node;
  tail = node;
  count++;
}

void LinkedList::display() {
  NodePtr curr = head;
  while (curr) {
    cout << curr->data << " ";
    curr = curr->next;
  }
  cout << endl;
}

// Merging two sorted lists of n numbers each in O(n) time
/* Analysis:
 * Suppose we charge the cost of each iteration to the element that is
 * selected and added to the output list.
 *
 * An element can be charged only once, since at the moment it is charged,
 * it is added to the output list and never seen again by the algorithm.
 *
 * But, there are only 2n elements total, and the cost of each iteration
 * is accounted for by a charge to some element, so there can be at
 * most 2n iterations.
 *
 * Each iteration involves a constant amount of work, so the total
 * running time is O(n).
 */
int main() {
  LinkedList list1, list2, outputList;
  list1.insert(19);
  list1.insert(11);
  list1.insert(3);
  list1.insert(2);
  list2.insert(25);
  list2.insert(16);
  list2.insert(9);
  list2.insert(4);
  cout << "List 1: "; list1.display();
  cout << "List 2: "; list2.display();

  // Maintain a current pointer into each list, initialized to point
  //  to the front elements (implemented by peek())
  // While both lists are non-empty
  while (!list1.isEmpty() && !list2.isEmpty())
    // Append the smaller of the two to the output list
    if (list1.peek() < list2.peek())
      // Advance the current pointer in the list from which the smaller
      //  element was selected (implemented by peek() and popHead())
      outputList.append(list1.popHead());
    else
      outputList.append(list2.popHead());

  // Once one list is empty, append the remainder of the other list
  //  to the output
  if (list1.isEmpty())
    while (!list2.isEmpty())
      outputList.append(list2.popHead());
  else
    while (!list1.isEmpty())
      outputList.append(list1.popHead());

  cout << "Output list: "; outputList.display();
  return 0;
}
